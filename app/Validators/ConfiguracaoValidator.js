"use strict";

const Antl = use("Antl");

class ConfiguracaoValidator {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      bruto_min: "required",
      bruto_max: "required",
      reator1_min: "required",
      reator1_max: "required",
      reator2_min: "required",
      reator2_max: "required",
      reator3_min: "required",
      reator3_max: "required",
      tratado_min: "required",
      tratado_max: "required",
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = ConfiguracaoValidator;
