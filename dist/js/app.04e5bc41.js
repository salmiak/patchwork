(function(t){function e(e){for(var s,r,o=e[0],l=e[1],c=e[2],f=0,d=[];f<o.length;f++)r=o[f],n[r]&&d.push(n[r][0]),n[r]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);u&&u(e);while(d.length)d.shift()();return a.push.apply(a,c||[]),i()}function i(){for(var t,e=0;e<a.length;e++){for(var i=a[e],s=!0,o=1;o<i.length;o++){var l=i[o];0!==n[l]&&(s=!1)}s&&(a.splice(e--,1),t=r(r.s=i[0]))}return t}var s={},n={0:0},a=[];function r(e){if(s[e])return s[e].exports;var i=s[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=s,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(i,s,function(e){return t[e]}.bind(null,s));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;a.push([0,1]),i()})({"/Pq7":function(t,e,i){"use strict";var s=i("Hhs1"),n=i.n(s);n.a},0:function(t,e,i){t.exports=i("Vtdi")},"0xYT":function(t,e,i){},1:function(t,e){},2:function(t,e){},3:function(t,e){},4:function(t,e){},"7L6m":function(t,e,i){"use strict";var s=i("ZWe8"),n=i.n(s);n.a},B5QG:function(t,e,i){},Hhs1:function(t,e,i){},U3Pp:function(t,e,i){"use strict";var s=i("B5QG"),n=i.n(s);n.a},Vtdi:function(t,e,i){"use strict";i.r(e);i("yt8O"),i("VRzm");var s=i("Kw5r"),n=i("Kyfw"),a=i.n(n),r=i("ChK9"),o=i.n(r),l=i("TrUB"),c=i.n(l),u=i("AIYa"),f=i.n(u),d=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[t.$root.isMobile?i("div",{staticClass:"gamearea mobile"},[i("quilt-board",{attrs:{tile:t.tile,player:t.currentPlayer}}),i("div",{staticClass:"boardsArea"},[i("quilt-board-mini",{attrs:{player:t.otherPlayer}}),i("play-board")],1),t.tile?i("div",{staticClass:"mobileToolbar"},[i("p",[i("tile-mini",{attrs:{"tile-data":t.tile}})],1),t.$store.state.miniTile?[t._v("\n        Place this tile to continue.\n        "),i("button",{on:{click:function(e){t.$store.commit("storeTile")}}},[i("i",{staticClass:"fal fa-arrow-right"}),t._v(" Play tile")])]:[i("button",{on:{click:t.mirrorTile}},[i("i",{staticClass:"fal fa-sync"}),t._v(" Mirror Tile")]),t._v(" \n        "),i("button",{on:{click:t.rotateTile}},[i("i",{staticClass:"fal fa-sync"}),t._v(" Rotate Tile")]),i("button",{on:{click:t.clearSelectedTile}},[i("i",{staticClass:"fal fa-arrow-left"}),t._v(" Back to tiles")]),i("button",{on:{click:function(e){t.$store.commit("storeTile")}}},[i("i",{staticClass:"fal fa-arrow-right"}),t._v(" Play tile")])]],2):i("div",{staticClass:"mobileToolbar"},[i("tile-list"),t.miniTile?t._e():i("button",{on:{click:t.goForward}},[i("i",{staticClass:"fal fa-arrow-right"}),t._v(" Go forward")])],1)],1):i("div",{staticClass:"gamearea desktop",class:{isPlayer1:0===t.currentPlayer.index,isPlayer2:1===t.currentPlayer.index}},[i("div",{staticClass:"store"},[i("button",{staticClass:"small",on:{click:function(e){t.playSounds=!t.playSounds}}},[i("i",{staticClass:"fal",class:{"fa-volume-up":t.playSounds,"fa-volume-mute":!t.playSounds}}),t._v(" Toggle sound")]),i("button",{staticClass:"small",on:{click:t.storeGame}},[i("i",{staticClass:"fal fa-save"}),t._v(" Save game")]),i("button",{staticClass:"small",on:{click:t.showStoredGames}},[i("i",{staticClass:"fal fa-arrow-up"}),t._v(" Load game")]),i("button",{staticClass:"small",on:{click:t.startNewServerGame}},[i("i",{staticClass:"fal fa-globe-africa"}),t._v(" Start online game")])]),i("div",{staticClass:"boardsArea"},[t._l(t.$store.state.players,function(e){return[t.currentPlayer.index===e.index?i("div",{key:e.index,staticClass:"boardContainer isActive",class:["player"+e.index]},[i("h2",[t._v(t._s(t.currentPlayer.name)+" "),i("span",[i("i",{staticClass:"fal fa-bullseye"}),t._v(" "+t._s(t.currentPlayer.buttonsInPocket))])]),i("quilt-board",{attrs:{tile:t.tile,player:t.currentPlayer}}),t.tile?i("div",{staticClass:"quiltBoardToolbar"},[i("tile-mini",{attrs:{"tile-data":t.tile}}),t.$store.state.miniTile?[t._v("\n              Place this tile to continue.\n            ")]:[i("button",{on:{click:t.mirrorTile}},[i("i",{staticClass:"fal fa-sync"}),t._v(" Mirror Tile")]),i("button",{on:{click:t.rotateTile}},[i("i",{staticClass:"fal fa-sync"}),t._v(" Rotate Tile")])]],2):i("div",{staticClass:"quiltBoardToolbar"},[i("center",[t._v("\n              Select a tile or go forward.\n            ")])],1)],1):t._e(),t.otherPlayer.index===e.index?i("div",{key:e.index,staticClass:"boardContainer",class:["player"+e.index]},[i("h2",[t._v(t._s(t.otherPlayer.name)+" "),i("span",[i("i",{staticClass:"fal fa-bullseye"}),t._v(" "+t._s(t.otherPlayer.buttonsInPocket))])]),i("quilt-board-mini",{attrs:{player:t.otherPlayer}})],1):t._e()]}),i("div",{staticClass:"boardContainer"},[i("play-board"),t.miniTile?t._e():i("button",{on:{click:t.goForward}},[i("i",{staticClass:"fal fa-arrow-right"}),t._v(" Go forward")])],1)],2),i("tile-list")],1),t.currentlyPlaying||t.isGameOver?t._e():i("div",{staticClass:"waiting overlay"},[i("h1",[t._v("Waiting for other player")]),i("p",[t._v("Invite another player to this game by inviting them to "),i("span",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:t.serverGameUrl,expression:"serverGameUrl",arg:"copy"}],staticClass:"gameUrl"},[t._v(t._s(t.serverGameUrl))])])]),t.gameFull?i("div",{staticClass:"overlay"},[t._v("\n    Game full - reload url to try again.\n  ")]):t._e(),t.isGameOver?i("div",{staticClass:"gameOver overlay"},[i("h3",[t._v("Game Over")]),t.winningPlayer?i("h1",[t._v("\n      The winner is "+t._s(t.winningPlayer)+"\n    ")]):i("h1",[t._v("\n      It's a tie!!\n    ")]),i("div",{staticClass:"playersContainer"},t._l(t.$store.state.players,function(e){return i("div",{key:e.index,staticClass:"player"},[i("h3",[t._v(t._s(e.name))]),i("quilt-board-mini",{attrs:{player:e}}),i("ul",[i("li",[i("strong",[t._v("Buttons")]),t._v(" "+t._s(e.buttonsInPocket)+"\n          ")]),i("li",[i("strong",[t._v("Penalty")]),t._v(" "+t._s(e.boardPenalty)+"\n          ")]),i("li",[i("strong",[t._v("Total")]),t._v(" "+t._s(e.endScore)+"\n          ")])])],1)})),i("button",{on:{click:t.resetGame}},[t._v("Reset Game")])]):t._e(),t.storedGamesList?i("div",{staticClass:"gameList overlay"},[i("h3",[t._v("Click a game to load it")]),i("ul",t._l(t.storedGamesList,function(e){return i("li",{key:e.id},[i("span",{on:{click:function(i){t.loadGame(e.id)}}},[t._v(t._s(e.name)+", "+t._s(e.date))]),i("i",{staticClass:"fal fa-trash",on:{click:function(i){t.removeStoredGame(e.id)}}})])})),i("button",{on:{click:function(e){t.storedGamesList=void 0}}},[t._v("Close list")])]):t._e()])},m=[],p=(i("rGqo"),i("f3/d"),i("LvDl")),h=i.n(p),y=i("RIfl"),v=i.n(y),b=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"board",class:{hit:t.hit,mobile:t.$root.isMobile},on:{mouseout:function(e){t.resetAllCells()}}},t._l(t.player.board,function(e,s){return i("div",{key:"row-"+s,staticClass:"row"},[t.$root.isMobile?t._l(e,function(e){return i("div",{key:"cell-"+e.id,staticClass:"cell",class:{filled:e.value,hovered:e.hovered,recent:e.lastMove,button:2===e.value},on:{touchstart:function(i){i.preventDefault(),t.touchStart(i,e)},touchmove:function(i){i.preventDefault(),t.touchMove(i,e)}}},[t._v(" ")])}):t._l(e,function(e){return i("div",{key:"cell-"+e.id,staticClass:"cell",class:{filled:e.value,hovered:e.hovered,recent:e.lastMove,button:2===e.value},on:{mouseover:function(i){t.mouseOver(e)},click:t.storeTile,contextmenu:function(e){e.preventDefault(),t.rotateTile()}}},[t._v(" ")])})],2)}))},g=[],_={name:"QuiltBoard",props:["tile","player"],data:function(){return{boardSize:9,hit:!1,cursor:{},touchStartPos:{}}},methods:{touchStart:function(t,e){this.touchStartPos={x:t.changedTouches[0].pageX,y:t.changedTouches[0].pageY},this.mouseOver(e)},touchMove:function(t,e){var i=Math.floor((t.changedTouches[0].pageX-this.touchStartPos.x)/25.59),s=Math.floor((t.changedTouches[0].pageY-this.touchStartPos.y)/25.59);this.mouseOver(this.getCellAt(e.x+i,e.y+s))},getCellAt:function(t,e){return this.$store.getters.getCellAt({x:t,y:e,pnr:this.player.index})},mouseOver:function(t){if(!this.tile)return!1;t=t||this.cursor,this.cursor={x:Math.min(Math.max(t.x,this.tile.offset.x),this.boardSize-(this.tile.pattern[0].length-this.tile.offset.x)),y:Math.min(Math.max(t.y,this.tile.offset.y),this.boardSize-(this.tile.pattern.length-this.tile.offset.y))},this.highlightCells()},highlightCells:function(){var t=this;this.$store.commit("unhoverAllCells"),this.hit=!1,this.tile.pattern.forEach(function(e,i){e.forEach(function(e,s){if(e){var n=t.getCellAt(t.cursor.x+s-t.tile.offset.x,t.cursor.y+i-t.tile.offset.y);n&&(t.$store.commit("hoverCell",{cell:n,button:2===e}),t.hit=t.hit||n.value)}})})},storeTile:function(){this.tile&&!this.hit&&(this.$store.commit("storeTile"),this.hit=!1)},rotateTile:function(){this.$store.commit("rotateTile"),this.mouseOver()},resetAllCells:function(){this.$store.commit("unhoverAllCells")}}},P=_,x=(i("U3Pp"),i("KHd+")),C=Object(x["a"])(P,b,g,!1,null,"0abcb178",null),T=C.exports,$=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"board"},t._l(t.player.board,function(e,s){return i("div",{key:"row-"+s+"-mini",staticClass:"row"},t._l(e,function(e,s){return i("div",{key:"cell-"+s+"-mini",staticClass:"cell",class:{filled:e.value,recent:e.lastMove,button:2===e.value}},[t._v(" ")])}))}))},k=[],w={name:"QuiltBoardMini",props:["player"],data:function(){return{boardSize:9}}},S=w,O=(i("YRuX"),Object(x["a"])(S,$,k,!1,null,"2c822c2a",null)),G=O.exports,M=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:{mobile:t.$root.isMobile},attrs:{id:"playBoard"}},t._l(t.sections,function(e,s){return i("div",{key:"sec-"+s,staticClass:"section",class:["section-"+s]},t._l(e,function(e){return i("div",{key:e.index,staticClass:"cell",class:["cell-"+e.index,{even:e.index%2,tripple:3===e.size,big:e.big,button:e.button}]},[e.button?i("div",{staticClass:"button"}):t._e(),e.patch?i("div",{staticClass:"patch"}):t._e(),e.index===t.player1pos?i("div",{staticClass:"player player1",class:{active:0===t.$store.getters.currentPlayer.index}}):t._e(),e.index===t.player2pos?i("div",{staticClass:"player player2",class:{active:1===t.$store.getters.currentPlayer.index}}):t._e()])}))}))},I=[],A={name:"PlayBoard",computed:{player1pos:function(){return this.$store.state.players[0].pos},player2pos:function(){return this.$store.state.players[1].pos},patches:function(){return this.$store.state.patches},buttons:function(){return this.$store.state.buttons},sections:function(){var t=[5,7,7,5,5,4,5,4,3,3,3,1,1,1],e=h.a.clone(this.cells);return h.a.map(t,function(t){return e.splice(0,t)})},cells:function(){var t=this,e=h.a.map(h.a.range(64),function(e){return{index:e,size:1,patch:-1!==t.patches.indexOf(e),big:-1!==t.$store.state.patchesPos.indexOf(e),button:-1!==t.buttons.indexOf(e)}});return e[0].size=3,e}}},B=A,E=(i("/Pq7"),Object(x["a"])(B,M,I,!1,null,"6f2527fb",null)),D=E.exports,j=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ul",{staticClass:"tileList",class:{mobile:t.$root.isMobile}},t._l(t.tileArray,function(e,s){return i("li",{key:e.id},[i("div",{staticClass:"tileInfo"},[i("i",{staticClass:"fal fa-hourglass-half"}),t._v(" "+t._s(e.time)+" | "),i("i",{staticClass:"fal fa-bullseye"}),t._v(" "+t._s(e.cost)+"\n    ")]),t.currentPlayer.buttonsInPocket>=e.cost&&s<3?i("tile",{attrs:{"tile-data":e},nativeOn:{click:function(i){t.selectTile(e)}}}):i("tile",{staticClass:"not-selectable",attrs:{"tile-data":e}})],1)}))},L=[],N=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tile",class:{mobile:t.$root.isMobile}},t._l(t.tileData.pattern,function(e,s){return i("div",{key:"r"+t.tileData.id+s,staticClass:"row"},t._l(e,function(e,n){return i("div",{key:"c"+t.tileData.id+s+n,staticClass:"cell",class:{filled:e,button:2===e}})}))}))},q=[],F={name:"Tile",props:["tileData"]},J=F,K=(i("oKnA"),Object(x["a"])(J,N,q,!1,null,"8c71a94e",null)),R=K.exports,U={name:"TileList",components:{Tile:R},computed:{currentPlayer:function(){return this.$store.getters["currentPlayer"]},tileArray:function(){return this.$store.getters["tileArray"]}},methods:{selectTile:function(t){this.$store.commit("setCurrentTile",t)}}},W=U,Y=(i("7L6m"),Object(x["a"])(W,j,L,!1,null,"8e76812e",null)),Z=Y.exports,z=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tileMiniContainer"},[i("div",{staticClass:"tile"},t._l(t.tileData.pattern,function(e,s){return i("div",{key:"r"+t.tileData.id+s,staticClass:"row"},t._l(e,function(e,n){return i("div",{key:"c"+t.tileData.id+s+n,staticClass:"cell",class:{filled:e,button:2===e}})}))}))])},Q=[],X={name:"TileMini",props:["tileData"]},H=X,V=(i("fTrD"),Object(x["a"])(H,z,Q,!1,null,"56fdc8e4",null)),tt=V.exports,et={ding:new Audio("http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3")},it={name:"app",components:{QuiltBoard:T,QuiltBoardMini:G,PlayBoard:D,TileList:Z,TileMini:tt},data:function(){return{storedGamesList:void 0,gameFull:!1,gameData:void 0,playSounds:!0}},computed:{serverGameUrl:function(){return window.location.href},isServerGame:function(){return!!this.$route.params.gameSession},currentlyPlaying:function(){return!this.isServerGame||this.gameData&&this.$store.state.currentlyPlaying===this.gameData.playerIndex},currentPlayer:function(){return this.$store.getters.currentPlayer},otherPlayer:function(){return this.$store.getters.currentNotPlayer},winningPlayer:function(){return this.$store.state.players[0].endScore!==this.$store.state.players[1].endScore&&h.a.maxBy(this.$store.state.players,"endScore").name},tile:function(){return this.$store.state.currentTile},miniTile:function(){return this.$store.state.miniTile},isGameOver:function(){return this.$store.state.gameOver}},watch:{currentlyPlaying:function(t,e){e&&this.isServerGame?(console.log("I just completed my play, ping-syncing my state"),this.$socket.emit("stateSyncPing",this.$store.state)):this.playSounds&&et.ding.play()},isGameOver:function(t){t&&(console.log("Game over, ping-syncing my state"),this.$socket.emit("gameOver",this.$store.state))}},created:function(){this.$store.commit("generateBoards")},sockets:{connect:function(){console.log("socket connected"),this.isServerGame?(console.log("It is a server game with the hash: "+this.$route.params.gameSession),this.$socket.emit("connect to",this.$route.params.gameSession)):console.log("Ignoring connection, this is a local game only")},gameFull:function(){this.gameFull=!0},gameInit:function(t){this.gameData=t,t.shared.state?(console.log("We have a previous state, set this up"),this.$store.commit("initNewState",t.shared.state)):0===t.playerIndex&&(console.log("We do not have a state and I am the first player, send my state"),this.$socket.emit("init state",h.a.pick(this.$store.state,["tileIdArray"])))},initNewState:function(t){console.log("got new state, replacing old"),this.$store.commit("initNewState",t)},stateSyncPong:function(t){this.isServerGame&&(console.log("I just received a new state"),this.$store.commit("updateState",t))}},methods:{clearSelectedTile:function(){this.$store.commit("resetTiles")},mirrorTile:function(){this.$store.commit("mirrorTile")},rotateTile:function(){this.$store.commit("rotateTile")},goForward:function(){if(this.miniTile)return console.log("you have to play this tile");var t=1+this.$store.getters.currentNotPlayer.pos-this.$store.getters.currentPlayer.pos;this.$store.commit("balancePlayersPocket",t),this.$store.commit("increasePlayerProgress",t)},resetGame:function(){window.location.reload()},storeGame:function(){var t=window.prompt("Give you game a name")||"No name",e=(new Date).getTime(),i="pw_game_"+e,s=h.a.cloneDeep(this.$store.state);s.players.forEach(function(t){delete t.board,t.cellsZipped=h.a.map(t.cells,function(t){return[t.id,t.x,t.y,t.value]}),delete t.cells});var n={name:t,id:i,timestamp:e,state:s};this.$cookies.set(i,btoa(JSON.stringify(n)));var a=this.$cookies.isKey("pw_games_list")?JSON.parse(atob(this.$cookies.get("pw_games_list"))):[];a.push({name:t,timestamp:e,id:i}),this.$cookies.set("pw_games_list",btoa(JSON.stringify(a)))},showStoredGames:function(){this.storedGamesList=JSON.parse(atob(this.$cookies.get("pw_games_list"))),this.storedGamesList.forEach(function(t){t.date=new Date(t.timestamp).toLocaleString()})},loadGame:function(t){var e=JSON.parse(atob(this.$cookies.get(t)));this.$store.commit("storeLoadGame",e),this.storedGamesList=void 0},removeStoredGame:function(t){this.$cookies.remove(t);var e=JSON.parse(atob(this.$cookies.get("pw_games_list")));e=h.a.reject(e,{id:t}),this.storedGamesList=h.a.reject(this.storedGamesList,{id:t}),this.$cookies.set("pw_games_list",btoa(JSON.stringify(e)))},startNewServerGame:function(){var t=v.a.generate();this.$router.push({path:"/".concat(t)}),this.$router.go(this.$router.currentRoute)}}},st=it,nt=(i("fFWK"),Object(x["a"])(st,d,m,!1,null,null,null)),at=nt.exports,rt=(i("dRSK"),i("L2JU")),ot=i("Weu+");s["a"].use(rt["a"]);var lt=9,ct=53,ut=new rt["a"].Store({state:{gameOver:!1,currentlyPlaying:0,players:[{index:0,name:"Green player",pos:0,buttonsOnBoard:0,buttonsInPocket:5,board:[[0]],cells:[],boardPenalty:0,endScore:0},{index:1,name:"Yellow player",pos:0,buttonsOnBoard:0,buttonsInPocket:5,board:[[0]],cells:[],boardPenalty:0,endScore:0}],tileIdArray:h.a.concat(0,h.a.shuffle(h.a.range(1,ot.length))),miniTile:!1,currentTile:void 0,patchesPos:[20,26,32,44,50],patches:[20,26,32,44,50],buttons:[4,10,16,22,28,34,40,46,52]},getters:{currentPlayer:function(t){return t.players[t.currentlyPlaying]},currentNotPlayer:function(t){return t.players[(t.currentlyPlaying+1)%2]},tileArray:function(t){return h.a.map(t.tileIdArray,function(t){return ot[t]})},getCellAt:function(t){return function(e){var i=e.x,s=e.y,n=e.pnr;return h.a.find(t.players[n].cells,{x:i,y:s})}}},mutations:{generateBoards:function(t){t.players.forEach(function(t){for(var e=[],i=0;i<lt;i++){for(var s=[],n=0;n<lt;n++){var a={id:""+n+i,x:n,y:i,value:0,lastMove:!1};s.push(a),t.cells.push(a)}e.push(s)}t.board=e})},hoverCell:function(t,e){var i=e.cell,n=e.button;s["a"].set(i,"hovered",n?2:1)},unhoverAllCells:function(t){t.players.forEach(function(t){t.cells.forEach(function(t){s["a"].set(t,"hovered",0)})})},setCurrentTile:function(t,e){if(t.miniTile)return console.log("You have to play this tile"),!1;t.currentTile=e},setMinitTile:function(t){var e={id:null,pattern:[[1]],offset:{x:0,y:0},time:0,cost:0,buttons:0};this.commit("setCurrentTile",e),t.miniTile=!0},resetTiles:function(t){t.currentTile=void 0,t.miniTile=!1},mirrorTile:function(t){if(!t.currentTile)return!1;var e=[];t.currentTile.pattern.forEach(function(t){e.push(h.a.reverse(t))}),s["a"].set(t.currentTile,"pattern",e)},rotateTile:function(t){if(!t.currentTile)return!1;for(var e=[],i=0;i<t.currentTile.pattern[0].length;i++)e.push(new Array(t.currentTile.pattern.length));t.currentTile.pattern.forEach(function(t,i){t.forEach(function(t,s){e[e.length-s-1][i]=t})}),s["a"].set(t.currentTile,"pattern",e)},storeTile:function(t){var e=t.currentTile;t.players.forEach(function(t){t.cells.forEach(function(t){t.lastMove=!!t.hovered||t.lastMove,t.value=t.hovered||t.value})}),this.commit("unhoverAllCells"),this.commit("resetTiles"),this.commit("removeTileFromArray",e),t.players[t.currentlyPlaying].buttonsInPocket+=-1*e.cost,t.players[t.currentlyPlaying].buttonsOnBoard+=e.buttons,this.commit("increasePlayerProgress",e.time)},removeTileFromArray:function(t,e){var i=t.tileIdArray.splice(0,t.tileIdArray.indexOf(e.id));t.tileIdArray=h.a.chain(t.tileIdArray).concat(i).without(e.id).value()},balancePlayersPocket:function(t,e){t.players[t.currentlyPlaying].buttonsInPocket+=e},increasePlayersBoardButtons:function(t,e){t.players[t.currentlyPlaying].buttonsOnBoard+=e},increasePlayerProgress:function(t,e){var i=t.players[t.currentlyPlaying],s=i.pos;i.pos+=e,i.pos=Math.min(i.pos,ct),t.buttons.forEach(function(t){s<=t&&i.pos>t&&(i.buttonsInPocket+=i.buttonsOnBoard)}),t.patches[0]<=i.pos?(this.commit("setMinitTile"),t.patches.shift()):i.pos+this.getters.currentNotPlayer.pos>=2*ct?this.commit("gameOver"):i.pos>this.getters.currentNotPlayer.pos&&this.commit("nextPlayer")},nextPlayer:function(t){t.currentlyPlaying=(t.currentlyPlaying+1)%2,t.players[t.currentlyPlaying].cells.forEach(function(t){t.lastMove=!1})},gameOver:function(t){t.gameOver=!0,t.players.forEach(function(t){var e=h.a.sumBy(t.cells,function(t){return t.value?1:0});t.boardPenalty=2*(lt*lt-e),t.endScore=t.buttonsInPocket-t.boardPenalty})},storeLoadGame:function(t,e){e.state.players.forEach(function(t){t.cells=h.a.map(t.cellsZipped,function(t){return{id:t[0],x:t[1],y:t[2],value:t[3]}}),delete t.cellsZipped,t.board=h.a.chunk(t.cells,lt)}),h.a.forIn(e.state,function(e,i){s["a"].set(t,i,h.a.cloneDeep(e))})},initNewState:function(t,e){h.a.forIn(h.a.omit(e,["players"]),function(e,i){s["a"].set(t,i,h.a.cloneDeep(e))}),e.players&&t.players.forEach(function(t,i){var s=e.players[i];t.buttonsOnBoard=s.buttonsOnBoard,t.buttonsInPocket=s.buttonsInPocket,t.pos=s.pos,s.cells.forEach(function(e,i){t.cells[i].lastMove=e.lastMove,t.cells[i].value=e.value})})},updateState:function(t,e){t.currentlyPlaying=e.currentlyPlaying,t.gameOver=e.gameOver,t.miniTile=e.miniTile,t.patches=e.patches,t.tileIdArray=e.tileIdArray,t.players.forEach(function(t,i){var s=e.players[i];t.buttonsOnBoard=s.buttonsOnBoard,t.buttonsInPocket=s.buttonsInPocket,t.pos=s.pos,s.cells.forEach(function(e,i){t.cells[i].lastMove=e.lastMove,t.cells[i].value=e.value})}),e.gameOver&&this.commit("gameOver")}}}),ft=ut,dt=i("jE9Z");s["a"].use(dt["a"]);var mt=new dt["a"]({routes:[{path:"/",component:at},{path:"/:gameSession",component:at}]}),pt=new(i("xsZ3"))(window.navigator.userAgent);s["a"].config.productionTip=!1,s["a"].use(a.a),s["a"].use(o.a,"/"),s["a"].use(c.a),s["a"].use(f.a),new s["a"]({store:ft,router:mt,computed:{isMobile:function(){return pt.phone()}},render:function(t){return t(at)}}).$mount("#app")},"Weu+":function(t){t.exports=[{id:0,pattern:[[1,1]],offset:{x:0,y:0},time:1,cost:2,buttons:0},{id:1,pattern:[[1,1,0],[0,2,1],[0,2,2]],offset:{x:1,y:1},time:6,cost:8,buttons:3},{id:2,pattern:[[1,0],[1,1],[1,1],[0,1]],offset:{x:1,y:1},time:2,cost:4,buttons:0},{id:3,pattern:[[1,1,2],[2,0,0]],offset:{x:1,y:0},time:6,cost:4,buttons:2},{id:4,pattern:[[1],[2],[1],[1]],offset:{x:0,y:0},time:3,cost:3,buttons:1},{id:5,pattern:[[2,0],[2,0],[2,1],[1,1]],offset:{x:1,y:1},time:5,cost:10,buttons:3},{id:6,pattern:[[0,1],[1,1],[2,0]],offset:{x:1,y:1},time:2,cost:3,buttons:1},{id:7,pattern:[[1,0],[1,0],[2,1],[0,1]],offset:{x:1,y:1},time:3,cost:2,buttons:1},{id:8,pattern:[[1,1,0],[0,1,0],[0,1,0],[0,1,1]],offset:{x:1,y:1},time:2,cost:1,buttons:0},{id:9,pattern:[[1],[1],[1]],offset:{x:0,y:0},time:2,cost:2,buttons:1},{id:10,pattern:[[1],[1],[2],[1],[1]],offset:{x:0,y:0},time:1,cost:7,buttons:1},{id:11,pattern:[[1,1],[1,0],[2,0],[1,1]],offset:{x:1,y:1},time:5,cost:1,buttons:1},{id:12,pattern:[[0,1,0],[1,1,1],[2,1,1],[0,1,0]],offset:{x:1,y:1},time:3,cost:5,buttons:1},{id:13,pattern:[[1,1,1],[0,1,0],[1,1,1]],offset:{x:1,y:1},time:3,cost:2,buttons:0},{id:14,pattern:[[0,2,0],[0,2,0],[1,1,1]],offset:{x:1,y:1},time:5,cost:5,buttons:2},{id:15,pattern:[[0,1],[2,1],[0,1],[0,1]],offset:{x:1,y:1},time:4,cost:3,buttons:1},{id:16,pattern:[[1,0],[1,1],[1,1]],offset:{x:1,y:1},time:2,cost:2,buttons:0},{id:17,pattern:[[0,1,0],[1,1,0],[0,1,1],[0,1,0]],offset:{x:1,y:1},time:1,cost:2,buttons:0},{id:18,pattern:[[0,1,0],[1,1,1]],offset:{x:1,y:1},time:2,cost:2,buttons:0},{id:19,pattern:[[1,1],[1,0]],offset:{x:0,y:0},time:1,cost:3,buttons:2},{id:20,pattern:[[0,1,1],[2,2,0],[2,0,0]],offset:{x:1,y:1},time:4,cost:10,buttons:3},{id:21,pattern:[[1,1],[1,0],[2,0]],offset:{x:0,y:0},time:2,cost:4,buttons:1},{id:22,pattern:[[0,2],[2,2],[1,0]],offset:{x:1,y:1},time:6,cost:7,buttons:3},{id:23,pattern:[[1,1],[1,0],[2,0],[2,0]],offset:{x:0,y:0},time:3,cost:10,buttons:2},{id:24,pattern:[[0,2,0],[1,1,1],[0,2,0]],offset:{x:1,y:1},time:4,cost:5,buttons:2},{id:25,pattern:[[1,2,1],[0,2,0],[0,1,0],[0,1,0]],offset:{x:0,y:0},time:2,cost:7,buttons:2},{id:26,pattern:[[1,1],[1,0],[1,1]],offset:{x:0,y:0},time:2,cost:1,buttons:0},{id:27,pattern:[[0,1,0],[1,1,1],[0,1,0],[0,2,0]],offset:{x:1,y:1},time:3,cost:0,buttons:1},{id:28,pattern:[[1,1],[1,0]],offset:{x:0,y:0},time:3,cost:1,buttons:0},{id:29,pattern:[[1,0],[2,1],[2,1],[1,0]],offset:{x:0,y:0},time:4,cost:7,buttons:2},{id:30,pattern:[[1,2],[1,2]],offset:{x:0,y:0},time:5,cost:6,buttons:2},{id:31,pattern:[[0,1,0],[0,1,0],[1,1,1],[0,1,0],[0,2,0]],offset:{x:1,y:2},time:4,cost:1,buttons:1},{id:32,pattern:[[0,1,0],[1,1,1],[2,0,2]],offset:{x:0,y:0},time:6,cost:3,buttons:2}]},YRuX:function(t,e,i){"use strict";var s=i("v909"),n=i.n(s);n.a},ZWe8:function(t,e,i){},fFWK:function(t,e,i){"use strict";var s=i("qirj"),n=i.n(s);n.a},fTrD:function(t,e,i){"use strict";var s=i("i3ZS"),n=i.n(s);n.a},i3ZS:function(t,e,i){},oKnA:function(t,e,i){"use strict";var s=i("0xYT"),n=i.n(s);n.a},qirj:function(t,e,i){},v909:function(t,e,i){}});
//# sourceMappingURL=app.04e5bc41.js.map