import ReactDOM from "react-dom";

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Helper from "./Helper";
import router from "./router";

$(document).on('ready', function() {
  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content")
    },
  });

  ReactDOM.render(<Helper />, document.getElementById('react-helper'));
  ReactDOM.render(router, document.getElementById('react-wrapper'));
});
