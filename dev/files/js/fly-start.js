/*$('#news-block').click(function() {
  $('body').addClass('overflow-hidden');
  $('#transition-layer').css({
    'display':'block',
    'animation':'1s transition-start-phase'
  });
  setTimeout(function() {
    document.location.href = "https://flight.pp.ua/news";
  }, 1000);
});*/

const circle = document.getElementById('circle');

document.getElementById('news-block').addEventListener('click', function(e) {
  document.querySelector('body').classList.add('overflow-hidden');
  circle.style.display = 'block';
  circle.style.left = e.pageX + 'px';
  circle.style.top = e.pageY + 'px';
  setTimeout( () => {circle.style.transform = 'translateX(-50%) translateY(-50%) scale(5)'}, 15 );
  setTimeout( () => {document.location.href = 'https://flight.pp.ua/dev/news'}, 1200 );
});

$('#gallery-block').click(function() {
  $('body').addClass('overflow-hidden');
  $('#transition-layer').css({
    'display':'block',
    'animation':'1s transition-start-phase'
  });
  setTimeout(function() {
    document.location.href = "https://flight.pp.ua/gallery";
  }, 1000);
});
