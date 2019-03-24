(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,a){},15:function(e,t,a){},16:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(7),l=a.n(s),i=(a(14),a(4)),c=a(3),o=a(5),u=a(1),h=a(2),m=(a(15),["Maria","Guard","Spell Caster","Seer","Hunter","Werewolf","Cursed","Villager"]);var p=function(){function e(t,a){Object(u.a)(this,e),this.pname=t,this.role=a,this.active_wolf=null,this.init_stats()}return Object(h.a)(e,[{key:"init_stats",value:function(){this.bitten=!1,this.protected=!1,this.seer=!1,this.muted=!1,this.hunted=!1,this.disabled=!1,this.previous_target=null}},{key:"do_action",value:function(e){if(this.previous_target=e,!this.disabled){var t=this.role;"Maria"===t?e.disabled=!0:"Guard"===t?e.protected=!0:"Spell Caster"===t?e.muted=!0:"Seer"===t?e.seer=!0:"Hunter"===t?e.hunted=!0:null!==this.active_wolf&&(e.protected||("Cursed"===e.role?(e.role="Werewolf",e.active_wolf=69):e.bitten=!0))}}}]),e}(),f=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(i.a)(this,Object(c.a)(t).call(this,e))).state={playerNames:[]},a}return Object(o.a)(t,e),Object(h.a)(t,[{key:"addPlayer",value:function(e){e.preventDefault();var t,a=this.state.playerNames.slice(),r=(t=this.refs.player.value).charAt(0).toUpperCase()+t.slice(1);""===r||a.includes(r)?this.setState({error:"Do not use the same name"}):(a.push(r),this.setState({playerNames:a,error:null})),this.refs.player.focus(),this.refs.player.value=""}},{key:"render",value:function(){var e=this,t=[],a=this.state.playerNames;return this.state.playerNames.forEach(function(e){return t.push(n.a.createElement("li",{className:"",key:e},e))}),n.a.createElement("div",null,n.a.createElement("h3",null,"Add players to the game"),this.state.error?n.a.createElement("p",{className:"text-danger"}," ",this.state.error):null,n.a.createElement("ul",{className:"mb-3"},t),n.a.createElement("form",{className:"form-inline",onSubmit:function(t){return e.addPlayer.bind(e)(t)}},n.a.createElement("div",{className:"input-group mb-3"},n.a.createElement("input",{type:"text",className:"form-control",ref:"player"}),n.a.createElement("div",{className:"input-group-append"},n.a.createElement("button",{className:"btn btn-danger",type:"submit"},"Add")))),n.a.createElement("button",{className:"btn btn-danger",onClick:function(){return e.props.submitPlayerNames(a)}},"Done"))}}]),t}(r.Component),d=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(i.a)(this,Object(c.a)(t).call(this,e))).state={numPlayer:a.props.playerNames.length},a}return Object(o.a)(t,e),Object(h.a)(t,[{key:"changeSelectRemain",value:function(){var e=this,t=0;m.forEach(function(a){var r=Number(e.refs[a].value);r>0&&(t+=r)}),this.setState({numPlayer:this.props.playerNames.length-t})}},{key:"createPlayers",value:function(){var e=this,t=[];if(m.forEach(function(a){for(var r=Number(e.refs[a].value),n=0;n<r;n++)t.push(a)}),t.length===this.props.playerNames.length){!function(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*(t+1)),r=e[t];e[t]=e[a],e[a]=r}}(t);var a=[],r=1;this.props.playerNames.forEach(function(e,n){var s=new p(e,t[n]);"Werewolf"===s.role&&(s.active_wolf=r,r+=1),a.push(s),console.log(s.pname,":",s.role,s.active_wolf)}),this.props.submitPlayer(a)}}},{key:"render",value:function(){var e=this,t=[],a=this.state.numPlayer<0?n.a.createElement("p",{className:"text-danger"}," Number of roles is not correct "):null;return m.forEach(function(a){return t.push(n.a.createElement("li",{className:"list-group-item",key:a},a,n.a.createElement("span",{className:"btn float-right",onClick:function(){e.refs[a].value=Number(e.refs[a].value)+1,e.changeSelectRemain()}}," ",n.a.createElement("i",{className:"fas fa-plus-circle text-white"})),n.a.createElement("input",{ref:a,className:"form-control float-right",style:{width:"80px",textAlign:"center"},type:"number",readOnly:!0}),n.a.createElement("span",{className:"btn float-right",onClick:function(){e.refs[a].value=e.refs[a].value>0?Number(e.refs[a].value)-1:e.refs[a].value,e.changeSelectRemain()}}," ",n.a.createElement("i",{className:"fas fa-minus-circle text-white"}))))}),n.a.createElement("div",null,n.a.createElement("h3",null,"Select roles: ",this.state.numPlayer>0?this.state.numPlayer+" remain":null),this.state.error?n.a.createElement("p",{className:"text-danger"}," this.state.error "):null,n.a.createElement("ul",{className:"list-group"},t),n.a.createElement("br",null),a||n.a.createElement("button",{className:"btn btn-danger",onClick:this.createPlayers.bind(this)},"Done"))}}]),t}(r.Component),v=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(i.a)(this,Object(c.a)(t).call(this,e))).state={night:a.props.night,currentPlayer:a.props.players[0],currentIndex:0,actions:{}},a}return Object(o.a)(t,e),Object(h.a)(t,[{key:"addAction",value:function(e){var t=this;e.preventDefault();var a=this.state.actions;this.props.players.forEach(function(e,r){var n=t.refs[e.pname],s=n.childNodes[0];s.checked&&(a[t.state.currentIndex]=r,s.checked=!1,n.style.background="lightcoral")}),this.setState({actions:a});var r=this.state.currentIndex;if((r+=1)===this.props.players.length)this.props.submitActions(this.state.actions);else{var n=this.props.players[r];this.setState({currentPlayer:n,currentIndex:r})}}},{key:"changeColor",value:function(){var e=this;this.props.players.forEach(function(t,a){var r=e.refs[t.pname];r.childNodes[0].checked?r.style.background="red":r.style.background="lightcoral"})}},{key:"render",value:function(){var e=this,t=[];return this.props.players.forEach(function(a,r){var s=n.a.createElement("div",{ref:a.pname,key:a.pname,className:"radio-div",onClick:e.changeColor.bind(e)},n.a.createElement("input",{type:"radio",id:a.pname,name:"target",className:"radio-input",required:!0}),n.a.createElement("label",{className:"radio-label",htmlFor:a.pname},a.pname));t.push(s)}),n.a.createElement("div",null,n.a.createElement("h2",null,"Night ",this.state.night),n.a.createElement("h3",null,"Turn of ",this.state.currentPlayer.pname),n.a.createElement("form",{onSubmit:function(t){return e.addAction.bind(e)(t)}},t,n.a.createElement("button",{type:"submit",className:"mt-3 btn btn-danger"},"Next")))}}]),t}(r.Component),y=function(e){function t(){return Object(u.a)(this,t),Object(i.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(h.a)(t,[{key:"executePlayer",value:function(e){var t=this;e.preventDefault(),this.props.players.forEach(function(e,a){t.refs[e.pname].childNodes[0].checked&&t.props.executePlayer(e)})}},{key:"changeColor",value:function(){var e=this;this.props.players.forEach(function(t,a){var r=e.refs[t.pname];r.childNodes[0].checked?r.style.background="red":r.style.background="lightcoral"})}},{key:"render",value:function(){var e=this,t=[];this.props.players.forEach(function(a,r){var s=n.a.createElement("div",{ref:a.pname,key:a.pname,className:"radio-div",onClick:e.changeColor.bind(e)},n.a.createElement("input",{type:"radio",id:a.pname,name:"target",className:"radio-input",required:!0}),n.a.createElement("label",{className:"radio-label",htmlFor:a.pname},a.pname));t.push(s)});var a=this.props.originPlayers.map(function(e){return n.a.createElement("li",null,e.pname,": ",e.role," ",e.active_wolf)});return n.a.createElement("div",null,n.a.createElement("h3",null,"Events: "),n.a.createElement("ul",null,this.props.events?this.props.events:"Nothing happened"),null!==this.props.gameOver?n.a.createElement("div",null,n.a.createElement("h3",null,this.props.gameOver),n.a.createElement("ul",null,a),n.a.createElement("button",{onClick:function(){return e.props.restart()},className:"btn btn-danger"},"New game")):n.a.createElement("div",null,n.a.createElement("h3",null," Who's the wolf ? "),n.a.createElement("form",{onSubmit:function(t){return e.executePlayer.bind(e)(t)}},t,n.a.createElement("button",{type:"submit",className:"mt-3 mr-3 btn btn-danger"},"Execute"),n.a.createElement("button",{onClick:function(){return e.props.nextPhase()},className:"mt-3 btn btn-secondary"},"Skip"))))}}]),t}(r.Component),b=new p("Albert","Werewolf");b.active_wolf=1;var g=new p("Goldy","Werewolf");g.active_wolf=2;new p("Alice","Seer"),new p("Golden","Hunter"),new p("Goldeny","Villager");var E=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(i.a)(this,Object(c.a)(t).call(this,e))).state={phase:"setUpName",players:[],playerNames:[],night:1},a}return Object(o.a)(t,e),Object(h.a)(t,[{key:"nextPhase",value:function(){this.setState(function(e,t){return{phase:"night",night:e.night+1}})}},{key:"submitPlayerNames",value:function(e){0!==e.length&&this.setState({playerNames:e,phase:"setUpRole"})}},{key:"submitPlayer",value:function(e){var t=this.gameOver(e);t?this.setState({players:e,originPlayers:e.slice(0),phase:"day",gameOver:t}):this.setState({players:e,originPlayers:e.slice(0),phase:"night"})}},{key:"getActiveWolf",value:function(){return this.state.players.filter(function(e){return null!==e.active_wolf}).reduce(function(e,t){return e.active_wolf<t.active_wolf?e:t})}},{key:"submitActions",value:function(e){var t=this.state.players,a=this.getActiveWolf();console.log(a),m.forEach(function(r){t.forEach(function(n,s){if(n.role===r){var l=t[e[s]];"Werewolf"!==n.role?n.do_action(l):n===a&&n.do_action(l)}})});var r=[],s=[];t.forEach(function(e){e.bitten&&(s.push(n.a.createElement("li",{key:e.id},e.pname," died.")),r.push(e),"Hunter"===e.role&&e.previous_target!==e&&(s.push(n.a.createElement("li",{key:e.previous_target.id},e.previous_target.pname," died.")),r.push(e.previous_target))),e.muted&&s.push(n.a.createElement("li",{key:e.id},e.pname," is muted.")),e.seer&&(e.bitten?s.push(n.a.createElement("li",{key:e.id},e.pname," needs to tell truth")):s.push(n.a.createElement("li",{key:e.id},e.pname," needs to tell truth (truth: ",e.previous_target.pname,")"))),e.init_stats()}),t=t.filter(function(e){return!r.includes(e)}),this.setState({phase:"day",events:s,players:t,gameOver:this.gameOver(t)})}},{key:"gameOver",value:function(e){var t=0;return e.forEach(function(e){t="Werewolf"===e.role?t-1:t+1}),t===e.length?"Villagers won.":t<=0?"Wolfs won.":null}},{key:"restart",value:function(){this.setState({phase:"setUpName",players:[],playerNames:[],events:[],night:1})}},{key:"executePlayer",value:function(e){var t=this.state.players.filter(function(t){return t!==e}),a=this.gameOver(t);a?this.setState({players:t,phase:"day",gameOver:a}):this.setState(function(e,a){return{players:t,phase:"night",night:e.night+1}})}},{key:"render",value:function(){var e=this.state.phase;return"setUpName"===e?n.a.createElement(f,{submitPlayerNames:this.submitPlayerNames.bind(this)}):"setUpRole"===e?n.a.createElement(d,{playerNames:this.state.playerNames,submitPlayer:this.submitPlayer.bind(this)}):"night"===e?n.a.createElement(v,{players:this.state.players,night:this.state.night,submitActions:this.submitActions.bind(this)}):"day"===e?n.a.createElement(y,{events:this.state.events,nextPhase:this.nextPhase.bind(this),players:this.state.players,originPlayers:this.state.originPlayers,executePlayer:this.executePlayer.bind(this),gameOver:this.state.gameOver,restart:this.restart.bind(this)}):n.a.createElement("div",null," ",e," ")}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(n.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,a){e.exports=a(16)}},[[8,1,2]]]);
//# sourceMappingURL=main.5fc04441.chunk.js.map