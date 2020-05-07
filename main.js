function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  var getAllRecords = function() {
    $.getJSON(
      "https://api.airtable.com/v0/app1QKbXe6N7O8ZDI/Games?api_key=keyo3joTA1YoDZgse",
      function(airtable) {
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          var game = record.fields["Game"];
          var photo = record.fields["Photo"];
          var summary = record.fields["Summary"];
          var genre = record.fields["Genre"];
          html.push(listView(id, game, photo, summary, genre));
        });
        $(".list-view").append(html);
      }
    );
  };

  var listView = function(id, game, photo, summary, genre) {
    return `
    <div class="col-sm-6">
    <div class="card">
    ${photo ? `<img src="${photo[0].url}">` : ``}
  <div class="card-body">
    <h5 class="card-title">${game}</h5>
    <p class="card-text">${summary}</p>
    <a href="index.html?id=${id}" class="btn btn-primary">Continue</a>
    <p style="text-align: right; font-size: 20px">${genre}</p>
  </div>
</div>
</div>
    `;
  };

  var getOneRecord = function(id) {
    $.getJSON(
      `https://api.airtable.com/v0/app1QKbXe6N7O8ZDI/Games/${id}?api_key=keyo3joTA1YoDZgse`,
      function(record) {
        var html = [];
        var game = record.fields["Game"];
        var genre = record.fields["Genre"];
        var price = record.fields["Price"];
        var players = record.fields["Players"];
        var photo = record.fields["Photo"];
        var platform = record.fields["Platform"];
        var summary = record.fields["Summary"];
        var similarGames = record.fields["Similar Games"];
        var trailer = record.fields["Trailer"];
        html.push(detailView( game, genre, price, players, photo, platform, summary, similarGames, trailer));
        $(".detail-view").append(html);
      }
    );
  };
  
  var detailView = function(game, genre, price, players, photo, platform, summary, similarGames, trailer) {
    return `
    <div class="card mb-5" style="max-width: 940px;">
    <div class="row no-gutters">
      <div class="col-md-4">
      ${photo ? `<img src="${photo[0].url}">` : ``}
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${game}</h5>
          <p class="card-text">Genre: ${genre}</p>
          <p class="card-text">Price: $${price}</p>
          <p class="card-text">Players: ${players} </p>
          <p class="card-text">Platform: ${platform} </p>
          <p class="card-text">Description: ${summary}</p>
          <p class="card-text"><a href="${trailer}" target="_blank"> Trailer </a></p>
          <p class="card-text">Similar Games: ${similarGames}</p>
        </div>
      </div>
      <a href="index.html" class="btn btn-dark">Back</a>
    </div>
  </div>
    `;
  };

  var id = getParameterByName("id");
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}