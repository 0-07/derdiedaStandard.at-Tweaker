 // ==UserScript== 
// @name          Binnen-I be gone v2.1
// @description   Entfernt die gängigsten Sorten von Binnen-Is.
// @include       * 
// ==/UserScript==  

(function () {

	//Suche ob Doppelformen auf der Seite vorhanden sind
	if (document.body != null && document.body.textContent.search(/( und |innen | oder | bzw)/) != -1){
		var textnodes = document.evaluate("//*[not(self::textarea) and not(self::script) and not(self::style) and not(descendant-or-self::code)]/text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < textnodes.snapshotLength; i++) {
			var node = textnodes.snapshotItem(i);
			
			var s = node.data;
			s = s.replace(/\bsie\/er|er\/sie\b/g, "er");
			s = s.replace(/\bSie\/[Ee]r|Er\/[Ss]ie\b/g, "Er");
			s = s.replace(/\b(i)(hr\/ihm|hm\/ihr)\b/ig, "$1hm");
			s = s.replace(/\bsie\/ihn|ihn\/sie\b/g, "ihn");
			s = s.replace(/\bSie\/[Ii]hn|Ihn\/[Ss]ie\b/g, "Ihn");
			s = s.replace(/\bihre?[rnms]?\/(seine?[rnms]?)|(seine?[rnms]?)\/ihre?[rnms]?\b/ig, "$1$2");
			s = s.replace(/\jede[rnms]?\/(jede[rnms]?)\b/ig, "$1");
			s = s.replace(/\b(d)(eren\/dessen|essen\/deren)\b/ig, "$1essen");
			s = s.replace(/\bdiese[r]?\/(diese[rnms])|(diese[rnms])\/diese[r]?\b/ig, "$1$2");
			s = s.replace(/\b((von |für |mit )?((d|jed|ein|ihr|zum|sein)(e[rn]?|ie) )?([a-zäöüß]{4,20} )?)([a-zäöüß]{2,})innen( und | oder | & | bzw.? |\/)\2?((d|jed|ein|ihr|zum|sein)(e[rmns]?|ie) )?\6?(\7(e?n?))\b/ig, "$1$12");  //Bürgerinnen und Bürger
			s = s.replace(/\b(von |für |mit |als )?(((zu )?d|jed|ein|ihr|zur|sein)(e|er|ie) )?(([a-zäöüß]{4,20}[en]) )?([a-zäöüß]{2,})(en?|in)( und | oder | & | bzw.? |\/)(\1|vom )?((((zu )?d|jed|ein|ihr|zum|sein)(e[nrms])? )?(\7[nrms]? )?(\8(e?(s|n|r)?)))\b/ig, "$1$12"); 	//die Bürgerin und der Bürger
			s = s.replace(/\b((von |für |mit |als )?((d|jed|ein|ihr|zum|sein)(e[rnms]?|ie) )?([a-zäöüß]{4,20}[en] )?([a-zäöüß]{2,})(e?(n|s|r)?))( und | oder | & | bzw.? |\/)(\2|von der )?(((von |zu )?d|jed|ein|ihr|zur|sein)(e[rn]?|ie) )?\6?\7(in(nen)?|en?)\b/ig, "$1");  //Bürger und Bürgerinnen, Bürger und Bürgerin
			node.data = s;
		}
	}	
	
	//Suche ob Binnen-Is auf der Seite vorhanden sind
	if (document.body != null && document.body.textContent.search(/[a-zäöüß]{2}((\/-?|_|\*| und -)?In|(\/-?|_|\*| und -)in|\([Ii]n*(en\)|\)en)?)(?!(\w{1,2}\b)|[A-Z]|[cf]o|stance|te[gr]|dex|dia|put|vent|v?it)|[A-ZÄÖÜß]{3}(\/-?|_|\*)IN[(NEN)\b]|\b(frau\/m|man\/frau)\b/) != -1){ //SchülerIn,Schüler/in,Schüler(in),SCHÜLER/IN
		var textnodes = document.evaluate("//*[not(self::textarea) and not(self::script) and not(self::style) and not(descendant-or-self::code)]/text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < textnodes.snapshotLength; i++) { 
		var node = textnodes.snapshotItem(i);
		
		//Untersuche Text genau auf alles was gefiltert werden soll, zur Weiterverarbeitung...
		if (node !== null && /[a-zäöüß]{2}((\/-?|_|\*| und -)?In|(\/-?|_|\*| und -)in(n\*en)?|INNen|\([Ii]n*(en\)|\)en)?)(?!(\w{1,2}\b)|[A-Z]|[cf]o|stance|te[gr]|dex|dia|put|vent|v?it)|[A-ZÄÖÜß]{3}(\/-?|_|\*)IN\b|der\/|die\/|den\/|dem\/|ein[Ee]?\/|zur\/|zum\/|sie|eR |em?\/e?r |em?\(e?r\) |frau\/m|man+\/frau/.test(node.nodeValue)) { 
			var s = node.data;

			//Prüfung auf Ersetzung
			if (s.search(/[a-zäöüß](\/-?|_|\*| und -)in\b/i) || s.search(/[a-zäöüß](\/-?|_|\*| und -)inn(\*|\))?en/i) || s.search(/[a-zäöüß]\(in/i) || s.search(/[a-zäöüß]INNen/) != -1) {
			s = s.replace(/(\/-?|_|\*)inn\*?en/ig, "Innen");		//Schüler/innen
			s = s.replace(/([a-zäöüß])\(inn(en\)|\)en)/ig, "$1Innen");	//Schüler(innen)
			s = s.replace(/([a-zäöüß])INNen/g, "$1Innen");	//SchülerINNen
			s = s.replace(/ und -innen\b/ig, "");				//und -innen
			s = s.replace(/(\/-?|_|\*)in\b/ig, "In");			//Schüler/in
			s = s.replace(/([a-zäöüß])\(in\)/ig, "$1In");		//Schüler(in)
			}
				
			//Plural
			if (s.search(/[a-zäöüß]Innen/i) != -1) {
				//Prüfung auf Sonderfälle
				if (s.search(/(chef|fan|gött|verbesser|äur|äs)innen/i) != -1) {	
				s = s.replace(/(C|c)hefInnen/g, "$1hefs");
				s = s.replace(/(F|f)anInnen/g, "$1ans");
				s = s.replace(/([Gg]ött|verbesser)(?=Innen)/g, "$1er");
				s = s.replace(/äurInnen/g, "auern");
				s = s.replace(/äsInnen/g, "asen"); 
				}
			s = s.replace(/\b(([Dd]en|[Aa]us|[Aa]ußer|[Bb]ei|[Dd]ank|[Gg]egenüber|[Ll]aut|[Mm]it(samt)?|[Nn]ach|[Ss]amt|[Vv]on|[Zz]u) ([ID]?[a-zäöüß]+en |[0-9.,]+ )?[A-ZÄÖÜ][a-zäöüß]+)erInnen\b/g, "$1ern"); //unregelmäßiger Dativ bei Wörtern auf ...erInnen
			s = s.replace(/(er?|ER?)Innen/g, "$1");
			s = s.replace(/([Aa]nwält|[Ää]rzt|e[iu]nd|rät|amt|äst|würf|äus|[ai(eu)]r|irt)Innen/g, "$1e");
			s = s.replace(/([nrtsmdfghpbklvwNRTSMDFGHPBKLVW])Innen/g, "$1en");
			}
			
			//Singular			
			if (s.search(/[a-zäöüß]In/) != -1 && s.search(/([Pp]lug|[Ll]og|[Aa]dd|Linked)In\b/) == -1) {		
				//Prüfung auf Sonderfälle
				if (s.search(/amtIn|stIn\B|verbesser(?=In)/) != -1) {
				s = s.replace(/verbesser(?=In)/g, "verbesserer");
				s = s.replace(/amtIn/g, "amter");
				s = s.replace(/stIn\B(?!(\w{1,2}\b)|[A-Z]|[cf]o|stance|te[gr]|dex|dia|put|vent|v?it)/g, "sten");	//JournalistInfrage
				}
				//Prüfung auf Umlaute
				if (s.search(/[äöüÄÖÜ][a-z]{0,3}In/) != -1) {
				s = s.replace(/ä(?=s(t)?In|tIn|ltIn|rztIn)/g, "a");
				s = s.replace(/ÄrztIn/g, "Arzt");
				s = s.replace(/ö(?=ttIn|chIn)/g, "o");					
				s = s.replace(/ü(?=rfIn)/g, "u");
				s = s.replace(/ündIn/g, "und");
				s = s.replace(/äurIn/g, "auer");
				}
			s = s.replace(/([skgvwzSKGVWZ]|ert|[Bb]rit|[Kk]und|ach)In(?!(\w{1,2}\b)|[A-Z]|[cf]o|stance|te[gr]|dex|dia|put|vent|v?it)/g, "$1e");	//ExpertIn, BritIn, KundIn, WachIn
			s = s.replace(/([nrtmdbplhfcNRTMDBPLHFC])In(?!(\w{1,2}\b)|[A-Z]|[cf]o|stance|te[gr]|dex|dia|put|vent|v?it)/g, "$1");
			}
			
			//Artikel
			if (s.search(/\/der |\/die |\bein(\/|\()*e|zu[rm] /i) != -1) {
			s = s.replace(/\b(d)(ie\/der|er\/die)\b/ig, "$1er");
			s = s.replace(/\b(d)(en\/die|ie\/den)\b/ig, "$1en");
			s = s.replace(/\b(d)(es\/der|er\/des)\b/ig, "$1es");
			s = s.replace(/\b(d)(er\/dem|em\/der)\b/ig, "$1em");
			s = s.replace(/\b([Ee])in(\/e |\(e\) |E )/g, "$1in ");
			s = s.replace(/\b([Ee])ine(\/n |\(n\) |N )/g, "$1inen ");
			s = s.replace(/\b([Ee])ine(\/r |\(r\) |R )/g, "$1iner ");
			s = s.replace(/\b(z)(um\/zur|ur\/zum)\b/ig, "$1um");
			}
			
			//Stuff				
			if (s.search(/eR |em?[\/|_]e?r |em?\(e?r\) /) != -1) {
			s = s.replace(/e[\/|_]r|e\(r\)|eR\b/g, "er");	//jede/r,jede(r),jedeR,
			s = s.replace(/em\(e?r\)|em[\/|_]r\b/g, "em");	//jedem/r
			s = s.replace(/er\(e?s\)|es[\/|_]r\b/g, "es");	//jedem/r
			}
			
			//man
			if (s.search(/\/(frau|man|mensch)/) != -1) {
			s = s.replace(/\b(frau|man+|mensch)+\/(frau|man+|mensch|\/)*/, "man");
			}
			
		node.data = s; }}
	}
})();