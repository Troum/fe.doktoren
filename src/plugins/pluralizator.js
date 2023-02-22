export default {
  install: (app) => {
    function pluralize(forms, data) {
      const n = Math.abs(data) % 100;
      const n1 = n % 10;
      if (n > 10 && n < 20) {
        return `${data} ${forms[2]}`;
      }
      if (n1 > 1 && n1 < 5) {
        return `${data} ${forms[1]}`;
      }
      if (n1 === 1) {
        return `${data} ${forms[0]}`;
      }
      return `${data} ${forms[2]}`;
    }

    app.config.globalProperties.$pluralize = pluralize;
    app.provide("pluralize", {pluralize});
  }
}
