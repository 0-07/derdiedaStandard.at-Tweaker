$(function(){
    DB_load(startOptionsPage);
});

function startOptionsPage() {
    
    $.each(Options.Scripts, function(index, script) {
       var $scriptTemplate = $("#scriptTemplate").clone().show();
       $scriptTemplate.find("label span").html("Aktiviere " + script.name);
       
       $scriptTemplate.find("label input[type='checkbox']")
       .data("script", script.path)
       .click(function() {
          if ($(this).is(":checked")) {
              script.enable = true; 
          } else {
              script.enable = false;
          }
          DB_save(function() {
              console.log("DB saved");
          });
       })
       .prop('checked', script.enable);
       
       $("#scripts").append($scriptTemplate);
    });    
}
