import consumer from "./consumer"
import $ from 'jquery';

consumer.subscriptions.create("NotificationChannel", {
  connected() {},
  disconnected() {},
  received(data) {

      timeout = 0
      if (data['notice']) {
          $('#horizontal_navbar').before("<div class=\"alert alert-success in\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button><div id=\"flash_notice\">" + data['notice'] + "</div></div>")
          if (timeout) {
              $(".alert" ).fadeOut(timeout);
          }
      }else{
          $('#horizontal_navbar').before("<div class=\"alert alert-danger in\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button><div id=\"flash_notice\">" + data['danger'] + "</div></div>")
          if (timeout) {
              $(".alert" ).fadeOut(timeout);
          }
      }

  }
});
