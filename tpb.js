//fonction to transform link

  function processNode() {
    var href = jQuery(this).attr("href");
    if(/[a-z]\:\/\//.exec(href) === null) {
      if(href[0] == "/")
        jQuery(this).attr("href", "http://thepiratebay.org" + href);
    }
  }

CmdUtils.CreateCommand({
  name: "tpb",
  icon:"http://thepiratebay.org/favicon.ico",
  takes: {"input": noun_arb_text},
  homepage: "http://shoutboxajax.com/ubiquity/thepiratebay", 
  author: { name: "A.BLANC", email: "amau96@gmail.com"}, 
  license: "MPL", 
  description: "Find a torrent without open thepiratebay in a new window. Clic on the double green arrow to direct start the download", 

  preview: function(previewBlock,input) {

     previewBlock.innerHTML ="Welcome to the pirate search, put the name of what you are looking for, or put \"top\" to have the top 100 of thePirateBay<br /><center><img src=\"http://static.thepiratebay.org/img/tpb.jpg\" width=\"50%\" height=\"50%\" ></center>";

    if(input.text!="" && input.text!="top")
      url="http://thepiratebay.org/search/"+input.text+"/0/7/0";
    if(input.text=="top")
      url="http://thepiratebay.org/top/all";


    if(input.text!=""){
    Utils.parseRemoteDocument(
      url, // URL
      null, // post data
      function(doc) { // success callback
      //on n'affiche pas la premiere colone
      jQuery(".vertTh",doc).css("display","none");

      //on definit la couleur du fond de la ligne
      jQuery("tr",doc).css("background","#F6F1EE none repeat scroll 0 0");

      //on definit la couleur de l'autre ligne
      jQuery("tr.alt",doc).css("background","#ccc none repeat scroll 0 0");

      //on definit la couleur des lien
      jQuery("a",doc).css("color","#000099");

      //on n'affiche que les 10 premiers elements
      jQuery("tr",doc).slice(10, 100).hide();

      //on n'affiche pas les titres
      jQuery("th",doc).slice(2, 3).hide();

      //on n'affiche pas les bordure des images
      jQuery("img",doc).css("border","0 none");

      //on definit la couleur du text
      jQuery("*",doc).css("color","#000099");

      jQuery("#searchResult",doc).find("a").each(processNode);

      previewBlock.innerHTML =  jQuery("#main-content", doc).html();
      },
      function() { // error callback
        previewBlock.innerHTML = "Error!";
      }
    );
   }//end of if input.text==""
  }
});

