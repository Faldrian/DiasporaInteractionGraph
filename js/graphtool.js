/**
 * Graph-Tool (since it will show some Graphs...)
 *
 * - Load interactions from diaspora-post
 * - Allow multiple analyst-plugins to run after data is loaded
 * - Render each plugin to it's own space on the page
 */

// add Plugins to this array.
var analysePlugins = [];

// define basic Plugin
analysePlugins.push({
  title: "Basic Numbers",

  run: function (interactions, targetElement) {
    targetElement.html(
      ' Likes: '+interactions.likes.length+
      ' Reshares: '+interactions.reshares.length+
      ' Comments: '+interactions.comments.length);
  }
});


function loadInteractions(posturl) {
  // extract host and guid from url
  var regexp = /https:\/\/(.*?)\/posts\/(.*)/;
  var parts = posturl.match(regexp);

  // check if we found all parts
  if(parts.length != 3) {
    alert("Url not valid.");
    return;
  }

  // load interactions via proxy
  $.getJSON('proxy.php', {
    host: parts[1],
    guid: parts[2]
  })
    .done(function(data) {
      runPlugins(data);
    })
    .fail(function() {
      alert("Request failed. Sorry.");
    });
}

function runPlugins(interactions) {
  // clear previous results
  $('#pluginArea').empty();

  analysePlugins.forEach(function(plugin) {
    // create target element
    var elem = $('<div class="pluginContainer"><h3>'+plugin.title+'</h3><div class="content"></div></div>');

    // execute plugin
    plugin.run(interactions, elem.find('.content'));

    $('#pluginArea').append(elem);
  });
}


$(function(){
  // Register handlers
  $('#startprocess').click(function(){
    loadInteractions($('#posturl').val());
  });
});