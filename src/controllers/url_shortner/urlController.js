import URLModel from "../../models/url.js";
import { nanoid } from "nanoid";
import 'dotenv/config';

const BASE_URL = process.env.BASE_URL || "http://localhost:8000/api/v1/url/redirect";

const createShortURL = async (req, res) => {
  try {
    const { url } = req.body;
    const userId = req.userInfo.userId;
    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL Is required"
      })
    }
    let attempts = 1;
    const shortedID = nanoid(6);
    while (attempts <= 5) {
      const checkExisting = await URLModel.findOne({
        shortedID: shortedID
      })
      if (!checkExisting) {
        break;
      }
      attempts++;
    }

    const shortedURL = `${BASE_URL}/${shortedID}`;
    const newURL = await URLModel.create({
      userId,
      shortedId: shortedID,
      redirectedURL: url,
      shortedURL
    })

    if (newURL) {
      return res.status(201).json({
        success: true,
        message: "Short URL created successfully",
        data: newURL
      })
    }
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in creating short URL"
    })
  }
}

const fetchALLUrls = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const urls = await URLModel.find({ userId }).sort({
      createdAt: -1
    })

    if (urls.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No URLs found for the user"
      })
    }

    return res.status(200).json({
      success: true,
      message: "URLs fetched successfully",
      data: urls
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching URLs"
    })
  }
}


const redirectURL = async (req, res) => {
  try {
    const { shortedID } = req.params;

    const url = await URLModel.findOne({
      shortedId: shortedID
    })

    if (!url) {
      console.log("URL not found for the given shorted ID");
      return res.status(404).json({
        success: false,
        message: "URL not found for the given shorted ID"
      })
    }

    url.visited += 1;
    await url.save();

    return res.redirect(url.redirectedURL);
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in redirecting URL"
    })
  }
}

const deleteURL = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteURL = await URLModel.findByIdAndDelete(id);

    if (!deleteURL) {
      return res.status(404).json({
        success: false,
        message: "URL not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "URL deleted successfully"
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in deleting URL"
    })
  }
}


export { createShortURL, fetchALLUrls, redirectURL, deleteURL }