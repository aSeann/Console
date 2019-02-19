var Console;
var logged = [];
Module.register("MMM-Console", {
  defaults: {
    lines: 10,
    colors: {
      info: "#3C763D",
      log: "#D9D9D1",
      error: "#A44",
      warn: "#A63",
      group: "#656",
      groupCollapsed: "#656",
      groupEnd: "#656",
      time: "#656",
      timeEnd: "#656",
      timeStamp: "#656"
    }
  },
  getStyles: function(){
    return ["MMM-Console.css"];
  },
  start: function(){
    Console = this;
    Log.info("Started Module: " + Console.name);
    var font = document.createElement('link');
    font.href = "https://fonts.googleapis.com/css?family=Inconsolata";
    font.rel = "stylesheet";
    document.getElementsByTagName('head')[0].appendChild(font);
  },
  getDom: function(){
    var wrapper = document.createElement("div");
    var ul = document.createElement("ul");
    ul.id = "ConsoleOut";
    wrapper.appendChild(ul);
    return wrapper;
  },
  appendLog: function(message, color){
    var ul = document.getElementById("ConsoleOut");
    if(ul){
      if(logged.length > 0)
        for(var i = 0; i < logged.length; i++)
          Console.log(logged[i].message, logged[i].color, ul);
      logged = [];
      Console.log(message, color, ul);
    } else logged.push({message: message, color: color});
  },
  log: function(message, color, parent){
    var elems = parent.getElementsByTagName('li');
    var li = document.createElement("li");
    li.className = "xsmall thin bright";
    li.style.color = color;
    if(elems.length >= Console.config.lines)
      elems[elems.length - Console.config.lines].style.display = "none";
    li.innerHTML = message;
    parent.appendChild(li);
  }
});
var Log = (function() {
	return {
		info: function(message){
      console.info(message);
      if(Console) Console.appendLog(message, Console.config.colors.info);
    },
		log: function(message){
      console.log(message);
      if(Console) Console.appendLog(message, Console.config.colors.log);
    },
		error: function(message){
      console.error(message);
      if(Console) Console.appendLog(message, Console.config.colors.error);
    },
		warn: function(message){
      console.warn(message);
      if(Console) Console.appendLog(message, Console.config.colors.warn);
    },
		group: function(message){
      console.group(message);
      if(Console) Console.appendLog(message, Console.config.colors.group);
    },
		groupCollapsed: function(message){
      console.groupCollapsed(message);
      if(Console) Console.appendLog(message, Console.config.colors.groupCollapsed);
    },
		groupEnd: function(message){
      console.groupEnd(message);
      if(Console) Console.appendLog(message, Console.config.colors.groupEnd);
    },
		time: function(message){
      console.time(message);
      if(Console) Console.appendLog(message, Console.config.colors.time);
    },
		timeEnd: function(message){
      console.timeEnd(message);
      if(Console) Console.appendLog(message, Console.config.colors.timeEnd);
    },
		timeStamp: function(message){
      console.timeStamp(message);
      if(Console) Console.appendLog(message, Console.config.colors.timeStamp);
    },
	};
})();
