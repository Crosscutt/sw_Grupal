export class Validadores {

  // definiendo algunas reglas:
  usernameMinLength = 3;
  passwordMinLength = 8;

  /**
   * Valida el nombre de usuario especificado basandose en 2 criterios:
   * - Cumple con la longitud mínima
   * - El nombre de usuario no se encuentra actualmente en uso
   * 
   * @param {string} username El nombre de usuario a validar
   */
  usernameLength(username) {
    if (username.length >= usernameMinLength && usernameEsUnico(username))
      return true;
    else
      return false;
  }


  /**
   * Conecta con el servidor y verifica que el nombre de usuario especificado
   * no se encuentre actualmente en uso por otra persona.
   * 
   * @param {string} username 
   */
  usernameUnique(username) {
    // TO DO:
    // 1. peticion al servidor
    // 2. espera de respuesta
    // 3. retorno de respuesta
    return true;
  }


  /**
   * Valida la contraseña especificada, verificando que:
   * - cumple con la longitud mínima
   * 
   * @param {string} password La contraseña a validar
   */
  passwordLength(password) {
    return (password.length >= passwordMinLength);
  }


  /**
   * Valida que las contraseñas ingresadas verificando que:
   * - cada contraseña sea válida
   * - son idénticas
   * 
   * @param {string} password 
   * @param {string} confirmPassword 
   */
  passwordsEqual(password, confirmPassword) {
    return (
      validarPassword(password)
      && validarPassword(confirmPassword)
      && password === confirmPassword);
  }


  /**
   * Valida que la dirección de email verificada cumpla con el patrón:
   * - cadema@cadena.cadena
   * 
   * NOTA: este patrón evalua la cadena "@@@.@@@" como válida
   * 
   * @param {string} email La dirección de email a validar
   */
  emailValid(email) {
    const re = /\S+@\S+\.\S+/;
    if (re.test(email)) return true;
    else return false;
  }


}
