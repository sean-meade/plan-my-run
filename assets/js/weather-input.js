

var min = 00,
    max = 23,
    select = document.getElementById('weather-input-time');

for (var i = min; i<=max; i++){
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    select.appendChild(opt);
}