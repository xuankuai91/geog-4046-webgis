function main() {
  // Go to map mode and hide globe
  $('#tab-map').click(function() {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');

    $('#map').show();
    $('#globe').hide();
  });

  // Go to globe mode and hide map
  $('#tab-globe').click(function() {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');

    $('#globe').show();
    $('#map').hide();
  });
};

$(document).ready(main);
