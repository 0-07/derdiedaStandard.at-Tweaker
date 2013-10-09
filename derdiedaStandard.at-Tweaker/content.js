DB_load(function() {    
    $.each(Options.Scripts, function(index, script) {
        if (script.enable) {
            $.getScript(chrome.extension.getURL(script.path), function() {
                console.log(script.name + " was loaded!");
            });
        }
    });
});
