"use strict";

const File = use("App/Models/File");
const Helpers = use("Helpers");

class FileController {

  async show({ params, response }) {
    const { id } = params
    const file = await File.find(id);
    return response.download(Helpers.tmpPath(`uploads/${file.path}`))
  }
}

module.exports = FileController;
