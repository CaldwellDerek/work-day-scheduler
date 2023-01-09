$(function () {
  const currentDate = $('#currentDay');
  const timeBlocksParent = $('#time-blocks-container');
  const saveButton = $('.saveBtn');

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
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
    } else if( child.attr("id") > currentHour ){
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
