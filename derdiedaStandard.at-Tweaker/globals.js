var localStoragePrefix = "script_";
var LS_options  = localStoragePrefix + "options";
var Options = {
    Scripts : [
        {
            name : "KommentarSortierung",
            path : "script1.js",
            enable : true
        },
		{
            name : "PosterIgnorieren",
            path : "script2.js",
            enable : true
        },
		{
            name : "Binnen-I-BeGone",
            path : "script3.js",
            enable : true
        },
		{
            name : "AnsichtssacheVertikal",
            path : "script4.js",
            enable : true
        }
    ]
};

function DB_setValue(name, value, callback) {
    var obj = {};
    obj[name] = value;
    console.log("ayarlar kaydedildi");
    console.log(obj);
    chrome.storage.local.set(obj, function() {
        if(callback) callback();
    });
}

function DB_load(callback) {
    chrome.storage.local.get(LS_options, function(r) {
        if ($.isEmptyObject(r[LS_options])) {
            DB_setValue(LS_options, Options, callback);
        } else {
            Options = r[LS_options];
            callback();
        }
    });
}

function DB_save(callback) {
    DB_setValue(LS_options, Options, function() {
        if(callback) callback();
    });
}

function DB_clear(callback) {
    chrome.storage.local.remove(LS_options, function() {
        if(callback) callback();
    });
}