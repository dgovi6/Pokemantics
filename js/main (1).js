$(document).ready(function(){

		function exportToCsv(filename, rows) {
	        var processRow = function (row) {
	            var finalVal = '';
	            for (var j = 0; j < row.length; j++) {
	                var innerValue = row[j] === null ? '' : row[j].toString();
	                if (row[j] instanceof Date) {
	                    innerValue = row[j].toLocaleString();
	                };
	                var result = innerValue.replace(/"/g, '""');
	                if (result.search(/("|,|\n)/g) >= 0)
	                    result = '"' + result + '"';
	                if (j > 0)
	                    finalVal += ',';
	                finalVal += result;
	            }
	            return finalVal + '\n';
	        };

	        var csvFile = '';
	        for (var i = 0; i < rows.length; i++) {
	            csvFile += processRow(rows[i]);
	        }

	        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
	        if (navigator.msSaveBlob) { // IE 10+
	            navigator.msSaveBlob(blob, filename);
	        } else {
	            var link = document.createElement("a");
	            if (link.download !== undefined) { // feature detection
	                // Browsers that support HTML5 download attribute
	                var url = URL.createObjectURL(blob);
	                link.setAttribute("href", url);
	                link.setAttribute("download", filename);
	                link.style.visibility = 'hidden';
	                document.body.appendChild(link);
	                link.click();
	                document.body.removeChild(link);
	            }
	        }
	    }

		/*inizializzo la colonna sonora*/
		var opening = document.getElementById("opening");
		var oak = document.getElementById("oak");
		var gym = document.getElementById("gym");
		var battle = document.getElementById("battle");

		/*inizializzo la variabile score*/
		score_tot=0;
		score_1=0;
		score_2=0;
		score_3=0;
		score_4=0;

		var graph_csv = [["against","pokemon","points"]];

		//inizializzo i Pokemon di Blue
		var pokemon_blue = ["Gyarados","Arcanine","Alakazam","Rhydon","Exeggutor","Pidgeot"];
		var my_starter=0;
		var blue_starter=0;
		/*gestisco la scelta dello starter*/
		starter=0;
		$("#picker > img:nth-child(1)").click(function(){
			$("#pokedex").attr("src","img/bulbasaur.png");
			starter="Venusaur";
			$(".shake").css({"opacity":""});
			$(this).css({"opacity":"0.5"});
			my_starter="https://cdn.bulbagarden.net/upload/a/ae/003Venusaur.png";
			blue_starter="https://cdn.bulbagarden.net/upload/7/7e/006Charizard.png";
		});
		$("#picker > img:nth-child(2)").click(function(){
			$("#pokedex").attr("src","img/charmander.png");
			starter="Charizard";
			$(".shake").css({"opacity":""});
			$(this).css({"opacity":"0.5"});
			my_starter="https://cdn.bulbagarden.net/upload/7/7e/006Charizard.png";
			blue_starter="https://cdn.bulbagarden.net/upload/0/02/009Blastoise.png";
		});
		$("#picker > img:nth-child(3)").click(function(){
			$("#pokedex").attr("src","img/squirtle.png");
			starter="Blastoise";
			$(".shake").css({"opacity":""});
			$(this).css({"opacity":"0.5"});
			my_starter="https://cdn.bulbagarden.net/upload/0/02/009Blastoise.png";
			blue_starter="https://cdn.bulbagarden.net/upload/a/ae/003Venusaur.png";
		});
		$("#picker > img").click(function(){
			$("#submit0").css("opacity","1");
		});
		$("#submit0").click(function(){
			if (starter=="Venusaur"){
				pokemon_blue.splice(pokemon_blue.indexOf("Arcanine"),1);
			}else if (starter=="Blastoise"){
				pokemon_blue.splice(pokemon_blue.indexOf("Exeggutor"),1);
			}else{
				pokemon_blue.splice(pokemon_blue.indexOf("Gyarados"),1);
			};

			$("#blue_grill > div:nth-child(1)").append("<img src='"+blue_starter+"'>");
			$("#player_grill > div:nth-child(1)").append("<img src='"+my_starter+"'>");
			
			$.getJSON("json/list_pokemon.json", function(myjson){
				//recupero i Pokemon di Blue
				for (var i = 0; i <= pokemon_blue.length - 1; i++) {
					append_img(myjson["Blue"][""+pokemon_blue[i]+""],"#blue_grill > div:nth-child("+(i+2)+")");
				};
				//creo i pool di Pokemon per la scelta del giocatore
				var pool1=[];
				var pool2=[];
				var pool3=[];
				var pool4=[];
				var pool5=[];
				var pools=[];
				pools.push(pool1);
				pools.push(pool2);
				pools.push(pool3);
				pools.push(pool4);
				pools.push(pool5);
				var name_pool1=[];
				var name_pool2=[];
				var name_pool3=[];
				var name_pool4=[];
				var name_pool5=[];
				var name_pools=[];
				name_pools.push(name_pool1);
				name_pools.push(name_pool2);
				name_pools.push(name_pool3);
				name_pools.push(name_pool4);
				name_pools.push(name_pool5);
				for (var i = 0; i <= pokemon_blue.length -1; i++) {
					$.each(myjson[pokemon_blue[i]], function (idx, val) {
					    pools[i].push(val);
					});
					$.each(myjson[pokemon_blue[i]], function (idx, val) {
					    name_pools[i].push(idx);
					});
				};

				var status=0
				$("#submit4").click(function(){
					status=1
					$("#player_pool > div").empty();
					for (var i = 0; i < 10; i++) {
						append_img(pool1[i],"#player_pool > div:nth-child("+(i+1)+")");
					};
					$(".b").css({"border":"2px solid #F46036"});
				});
				
				$(".b").click(function(){
					status=1;
					$("#player_pool > div").empty();
					for (var i = 0; i < 10; i++) {
						append_img(pool1[i],"#player_pool > div:nth-child("+(i+1)+")");
					};
					$(".a").css({"border":""});
					$(".b").css({"border":"2px solid #F46036"});
					$(".c").css({"border":""});
					$(".d").css({"border":""});
					$(".e").css({"border":""});
					$(".f").css({"border":""});
					$("#poke_picker > div > img").attr("src","img/close.png");
					$("#poke_picker > div:nth-child("+(status+1)+") > img").attr("src","img/open.png");
				});

				$(".c").click(function(){
					status=2;
					$("#player_pool > div").empty();
					for (var i = 0; i < 10; i++) {
						append_img(pool2[i],"#player_pool > div:nth-child("+(i+1)+")");
					};
					$(".a").css({"border":""});
					$(".b").css({"border":""});
					$(".c").css({"border":"2px solid #F46036"});
					$(".d").css({"border":""});
					$(".e").css({"border":""});
					$(".f").css({"border":""});
					$("#poke_picker > div > img").attr("src","img/close.png");
					$("#poke_picker > div:nth-child("+(status+1)+") > img").attr("src","img/open.png");
				});

				$(".d").click(function(){
					status=3;
					$("#player_pool > div").empty();
					for (var i = 0; i < 10; i++) {
						append_img(pool3[i],"#player_pool > div:nth-child("+(i+1)+")");
					};
					$(".a").css({"border":""});
					$(".b").css({"border":""});
					$(".c").css({"border":""});
					$(".d").css({"border":"2px solid #F46036"});
					$(".e").css({"border":""});
					$(".f").css({"border":""});
					$("#poke_picker > div > img").attr("src","img/close.png");
					$("#poke_picker > div:nth-child("+(status+1)+") > img").attr("src","img/open.png");
				});

				$(".e").click(function(){
					status=4;
					$("#player_pool > div").empty();
					for (var i = 0; i < 10; i++) {
						append_img(pool4[i],"#player_pool > div:nth-child("+(i+1)+")");
					};
					$(".a").css({"border":""});
					$(".b").css({"border":""});
					$(".c").css({"border":""});
					$(".d").css({"border":""});
					$(".e").css({"border":"2px solid #F46036"});
					$(".f").css({"border":""});
					$("#poke_picker > div > img").attr("src","img/close.png");
					$("#poke_picker > div:nth-child("+(status+1)+") > img").attr("src","img/open.png");
				});

				$(".f").click(function(){
					status=5;
					$("#player_pool > div").empty();
					for (var i = 0; i < 10; i++) {
						append_img(pool5[i],"#player_pool > div:nth-child("+(i+1)+")");
					};
					$(".a").css({"border":""});
					$(".b").css({"border":""});
					$(".c").css({"border":""});
					$(".d").css({"border":""});
					$(".e").css({"border":""});
					$(".f").css({"border":"2px solid #F46036"});
					$("#poke_picker > div > img").attr("src","img/close.png");
					$("#poke_picker > div:nth-child("+(status+1)+") > img").attr("src","img/open.png");
					$("#final_submit").css({"opacity":"1"});
				});

				$("#player_pool > div").delegate("#player_pool > div > img", "click", function() {
					    src=$(this).attr("src");
					    $("#player_grill > div:nth-child("+(status+1)+")").empty();
						$("#player_grill > div:nth-child("+(status+1)+")").append("<img src='"+src+"'>");
				});

				/*creo l'oggetto da esportare*/
				$("#final_submit").click(function(){
					var picked=[];
					for (var i = 1; i < 6; i++) {
						url=$("#player_grill > div:nth-child("+(i+1)+") > img").attr("src");
						var myRegexp = /\d{3}(\D+).png/g;
						var match = myRegexp.exec(url);
						picked.push(match[1]);
					};

					for (var i = 0; i < 5; i++) {
						for (var j = 0; j < 10; j++) {
							var row = [pokemon_blue[i],name_pools[i][j],((100-score_tot)/900)];
							if (picked[i]==name_pools[i][j]){
								row = [pokemon_blue[i],name_pools[i][j],((score_tot)/100)];
							};
							graph_csv.push(row);

						};
					};
					exportToCsv("export.csv", graph_csv);
				});
				/*finisco l'oggetto da esportare*/

			});

		});


		/*recupero le immagini*/
	    	function append_img(uri,elem){
		    	$.get(uri, function(data){
	        		var external_html = data;
					var htmlObject = $(external_html); // jquery call
					var url = "https:"+htmlObject.find("#file > a").attr("href");
						$(elem).append("<img src='"+url+"'>");
					if ($(elem +"> img").attr("src")=="https:undefined") {
						$(elem+"> img").css({"visibility":"hidden"});
					};
	        	});
	        }

		/*recupero tutti i dati sulle domande dal json e gestisco gli eventi*/
	    $.getJSON("json/domande.json", function(myjson){

	        /*gestisco le domande*/
	        $(".answer").hover(function(){
			    $(this).animate({borderWidth: "5px"},100);
			    }, function(){
			    $(this).animate({borderWidth: "2px"},100);
			});

		   	$("#q1 > h2").text(myjson.domanda1.statement);
		   	$("#q1 > .console > div:nth-child(1)").text(myjson.domanda1["r1"][0]);
		   	$("#q1 > .console > div:nth-child(1)").attr("point", myjson.domanda1["r1"][1]);
		   	$("#q1 > .console > div:nth-child(1)").addClass(myjson.domanda1["r1"][0]);
		   	$("#q1 > .console > div:nth-child(2)").text(myjson.domanda1["r2"][0]);
		   	$("#q1 > .console > div:nth-child(2)").attr("point", myjson.domanda1["r2"][1]);
		   	$("#q1 > .console > div:nth-child(2)").addClass(myjson.domanda1["r2"][0]);
		   	$("#q1 > .console > div:nth-child(3)").text(myjson.domanda1["r3"][0]);
		   	$("#q1 > .console > div:nth-child(3)").attr("point", myjson.domanda1["r3"][1]);
		   	$("#q1 > .console > div:nth-child(3)").addClass(myjson.domanda1["r3"][0]);
		   	$("#q1 > .console > div:nth-child(4)").text(myjson.domanda1["r4"][0]);
		   	$("#q1 > .console > div:nth-child(4)").attr("point", myjson.domanda1["r4"][1]);
		   	$("#q1 > .console > div:nth-child(4)").addClass(myjson.domanda1["r4"][0]);
		   	$("#q1 > .console > .answer").click(function(){
		   		$(".answer").css({"background-color":"","border":"","color":""});
		   		$(this).css({"background-color": "#3865AB", "border": "2px solid #fec930","color":"#fff"});
		   		score_1 = Number($(this).attr("point"));
		   		$("#submit1").css("opacity","1");
		   	});
		   	$("#submit1").click(function(){
		   		score_tot += score_1
		   	});


		   	$("#q2 > h2").text(myjson.domanda2.statement);
		   	$("#q2 > .console > div:nth-child(1)").text(myjson.domanda2["r1"][0]);
		   	$("#q2 > .console > div:nth-child(1)").attr("point", myjson.domanda2["r1"][3]);
		   	append_img(myjson.domanda2["r1"][2],"#q2 > .console > div:nth-child(1)");
		   	$("#q2 > .console > div:nth-child(2)").text(myjson.domanda2["r2"][0]);
		   	$("#q2 > .console > div:nth-child(2)").attr("point", myjson.domanda2["r2"][3]);
		   	append_img(myjson.domanda2["r2"][2],"#q2 > .console > div:nth-child(2)");
		   	$("#q2 > .console > div:nth-child(3)").text(myjson.domanda2["r3"][0]);
		   	$("#q2 > .console > div:nth-child(3)").attr("point", myjson.domanda2["r3"][3]);
		   	append_img(myjson.domanda2["r3"][2],"#q2 > .console > div:nth-child(3)");
		   	$("#q2 > .console > div:nth-child(4)").text(myjson.domanda2["r4"][0]);
		   	$("#q2 > .console > div:nth-child(4)").attr("point", myjson.domanda2["r4"][3]);
		   	append_img(myjson.domanda2["r4"][2],"#q2 > .console > div:nth-child(4)");
		   	$("#q2 > .console > .answer").click(function(){
		   		$(".answer").css({"background-color":"","border":"","color":""});
		   		$(this).css({"background-color": "#3865AB", "border": "2px solid #fec930","color":"#fff"});
		   		score_2 = Number($(this).attr("point"));
		   		$("#submit2").css("opacity","1");
		   	});
		   	$("#submit2").click(function(){
		   		score_tot += score_2
		   	});


		   	$("#q3 > h2").text(myjson.domanda3.statement);
		   	$("#q3 > .console > div:nth-child(1)").text(myjson.domanda3["r1"][0]);
		   	$("#q3 > .console > div:nth-child(1)").attr("point", myjson.domanda3["r1"][1]);
		   	$("#q3 > .console > div:nth-child(2)").text(myjson.domanda3["r2"][0]);
		   	$("#q3 > .console > div:nth-child(2)").attr("point", myjson.domanda3["r2"][1]);
		   	$("#q3 > .console > div:nth-child(3)").text(myjson.domanda3["r3"][0]);
		   	$("#q3 > .console > div:nth-child(3)").attr("point", myjson.domanda3["r3"][1]);
		   	$("#q3 > .console > div:nth-child(4)").text(myjson.domanda3["r4"][0]);
		   	$("#q3 > .console > div:nth-child(4)").attr("point", myjson.domanda3["r4"][1]);
		   	$("#q3 > .console > .answer").click(function(){
		   		$(".answer").css({"background-color":"","border":"","color":""});
		   		$(this).css({"background-color": "#3865AB", "border": "2px solid #fec930","color":"#fff"});
		   		score_3 = Number($(this).attr("point"));
		   		$("#submit3").css("opacity","1");
		   	});
		   	$("#submit3").click(function(){
		   		score_tot += score_3

		   	});


		   	$("#q4 > h2").text(myjson.domanda4.statement);
		   	$("#q4 > .console > div:nth-child(1)").text(myjson.domanda4["r1"][0]);
		   	$("#q4 > .console > div:nth-child(1)").attr("point", myjson.domanda1["r1"][3]);
		   	append_img(myjson.domanda4["r1"][2],"#q4 > .console > div:nth-child(1)");
		   	$("#q4 > .console > div:nth-child(2)").text(myjson.domanda4["r2"][0]);
		   	$("#q4 > .console > div:nth-child(2)").attr("point", myjson.domanda4["r2"][3]);
		   	append_img(myjson.domanda4["r2"][2],"#q4 > .console > div:nth-child(2)");
		   	$("#q4 > .console > div:nth-child(3)").text(myjson.domanda4["r3"][0]);
		   	$("#q4 > .console > div:nth-child(3)").attr("point", myjson.domanda4["r3"][3]);
		   	append_img(myjson.domanda4["r3"][2],"#q4 > .console > div:nth-child(3)");
		   	$("#q4 > .console > div:nth-child(4)").text(myjson.domanda4["r4"][0]);
		   	$("#q4 > .console > div:nth-child(4)").attr("point", myjson.domanda4["r4"][3]);
		   	append_img(myjson.domanda4["r4"][2],"#q4 > .console > div:nth-child(4)");
		   	$("#q4 > .console > .answer").click(function(){
		   		$(".answer").css({"background-color":"","border":"","color":""});
		   		$(this).css({"background-color": "#3865AB", "border": "2px solid #fec930","color":"#fff"});
		   		score_4 = Number($(this).attr("point"));
		   		$("#submit4").css("opacity","1");
		   	});
		   	$("#submit4").click(function(){
		   		score_tot += score_4
		   		score_tot = score_tot / 4.0
		   		/*gestisco i risultati del quiz*/
		   		$("#record").append("<h4>"+(score_tot*4.0)+"</h4>");
		   		if (score_tot>=80) {
		   			$("#record").append("<p>Grandissimo! Sembra proprio tu sia un vero esperto di Pokemon.</p>");
		   		}else if(score_tot>=30){
		   			$("#record").append("<p>Non male, ma per la Via Vittoria dovrai fare di meglio.</p>");
		   		}else{
		   			$("#record").append("<p>Non ci siamo proprio. Riparti da Biancavilla, e senza bici.</p>")
		   		};
		   		/*gestisco la console per la scelta delle squadre*/

		   		$(".a").hover(function(){
				    $(".a").animate({borderWidth: "5px"},100);
				    }, function(){
				    $(".a").animate({borderWidth: "2px"},100);
				});

				$(".b").hover(function(){
				    $(".b").animate({borderWidth: "5px"},100);
				    }, function(){
				    $(".b").animate({borderWidth: "2px"},100);
				});

				$(".c").hover(function(){
				    $(".c").animate({borderWidth: "5px"},100);
				    }, function(){
				    $(".c").animate({borderWidth: "2px"},100);
				});

				$(".d").hover(function(){
				    $(".d").animate({borderWidth: "5px"},100);
				    }, function(){
				    $(".d").animate({borderWidth: "2px"},100);
				});

				$(".e").hover(function(){
				    $(".e").animate({borderWidth: "5px"},100);
				    }, function(){
				    $(".e").animate({borderWidth: "2px"},100);
				});

				$(".f").hover(function(){
				    $(".f").animate({borderWidth: "5px"},100);
				    }, function(){
				    $(".f").animate({borderWidth: "2px"},100);
				});
		   	});

		});

		

});