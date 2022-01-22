// https://getbootstrap.com/docs/5.1/components/alerts/

// var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
// var alertTrigger = document.getElementById('use-current-location')


/**
 * 
 * @param {*} message = text displayed in alert
 * @param {*} type = type of alert
 * @param {*} alertPlaceholder = div above button pressed
 */
function alert(message, type, alertPlaceholder) {
  var alertPlaceholder = document.getElementById(alertPlaceholder);
  var wrapper = document.createElement('div')
  alertPlaceholder.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
  // alertPlaceholder.append(wrapper)
}

// if (alertTrigger) {
//   alertTrigger.addEventListener('click', function () {
//     alert('Nice, you triggered this alert message!', 'success')
//   })
// }