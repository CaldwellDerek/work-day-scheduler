$(function () {
  const currentDate = $('#currentDay');
  const timeBlocksParent = $('#time-blocks-container');
  const saveButton = $('.saveBtn');

  saveButton.on("click", (event)=> {
    let container = "";
    if (event.target.matches("button")){
      container = $(event.target).parent();
    } else {
      container = $(event.target).parent().parent();
    }

    localStorage.setItem(container.attr("id"), $(container.children('textarea')).val());
  })

  for(let child of timeBlocksParent.children('div')){
    let currentHour = dayjs().format("HH")
    if ($(child).attr("id") < currentHour){
      $(child).attr("class", "row time-block past");
    } else if( $(child).attr("id") === currentHour ){
      $(child).attr( "class", "row time-block present" );
    } else if( $(child).attr("id") > currentHour ){
      $(child).attr("class", "row time-block future");
    }

    let id = $(child).attr('id');
    let text = '';
    try {
      text = localStorage.getItem(id).trim();
    } catch (error){
      // Ignore
    }
    $(child).children('textarea').val(text);
  }

  currentDate.text(dayjs().format("dddd, MMMM D"));
});
