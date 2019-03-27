(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,a){},15:function(e,t,a){e.exports=a(34)},21:function(e,t,a){},34:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(8),l=a.n(s),i=(a(21),a(1)),o=a(2),c=a(4),u=a(3),h=a(5),m=a(9),p=(a(14),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={playerNames:[]},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"addPlayer",value:function(e){e.preventDefault();var t=this.state.playerNames.slice(),a=this.refs.player.value.trim().replace(/\b\w/g,function(e){return e.toUpperCase()});""===a?this.setState({error:"Do not use empty string"}):t.includes(a)?this.setState({error:"Do not use the same name"}):(t.push(a),this.setState({playerNames:t,error:null})),this.refs.player.focus(),this.refs.player.value=""}},{key:"render",value:function(){var e=this,t=[],a=this.state.playerNames;return this.state.playerNames.forEach(function(e){return t.push(r.a.createElement("li",{className:"",key:e},e))}),r.a.createElement("div",null,r.a.createElement("h3",null,"Add players to the game"),this.state.error?r.a.createElement("p",{className:"text-danger"}," ",this.state.error):null,r.a.createElement("ul",{className:"mb-3"},t),r.a.createElement("form",{className:"form-inline",onSubmit:function(t){return e.addPlayer.bind(e)(t)}},r.a.createElement("div",{className:"input-group mb-3"},r.a.createElement("input",{type:"text",className:"form-control",ref:"player"}),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("button",{className:"btn btn-danger",type:"submit"},"Add")))),r.a.createElement("button",{className:"btn btn-danger",onClick:function(){return e.props.submitPlayerNames(a)}},"Done"))}}]),t}(n.Component)),f=function(){function e(t,a){Object(i.a)(this,e),this.pname=t,this.role=a,this.active_wolf=null,this.init_stats()}return Object(o.a)(e,[{key:"init_stats",value:function(){this.bitten=!1,this.protected=!1,this.seer=!1,this.muted=!1,this.hunted=!1,this.disabled=!1,this.previous_target=null}},{key:"do_action",value:function(e){if(this.previous_target=e,!this.disabled){var t=this.role;"Maria"===t?e.disabled=!0:"Guard"===t?e.protected=!0:"Spell Caster"===t?e.muted=!0:"Seer"===t?e.seer=!0:"Hunter"===t?e.hunted=!0:null!==this.active_wolf&&(e.protected||("Cursed"===e.role?(e.role="Werewolf",e.active_wolf=69):e.bitten=!0))}}}]),e}(),d=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={numPlayer:a.props.playerNames.length},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"changeSelectRemain",value:function(){var e=this,t=0;b.forEach(function(a){var n=Number(e.refs[a].value);n>0&&(t+=n)}),this.setState({numPlayer:this.props.playerNames.length-t})}},{key:"createPlayers",value:function(){var e=this,t=[];if(b.forEach(function(a){for(var n=Number(e.refs[a].value),r=0;r<n;r++)t.push(a)}),t.length===this.props.playerNames.length){!function(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*(t+1)),n=e[t];e[t]=e[a],e[a]=n}}(t);var a=[],n=1;this.props.playerNames.forEach(function(e,r){var s=new f(e,t[r]);"Werewolf"===s.role&&(s.active_wolf=n,n+=1),a.push(s)}),this.props.submitPlayer(a)}}},{key:"createSelection",value:function(){var e=this;return b.map(function(t){return r.a.createElement("li",{className:"list-group-item",key:t},t,r.a.createElement("span",{className:"btn float-right",onClick:function(){e.refs[t].value=Number(e.refs[t].value)+1,e.changeSelectRemain()}},r.a.createElement("i",{className:"fas fa-plus-circle text-white"})),r.a.createElement("input",{ref:t,className:"form-control float-right roleInput",type:"text",readOnly:!0}),r.a.createElement("span",{className:"btn float-right",onClick:function(){var a=e.refs[t].value;e.refs[t].value=a>0?Number(a)-1:a,e.changeSelectRemain()}},r.a.createElement("i",{className:"fas fa-minus-circle text-white"})))})}},{key:"render",value:function(){var e=this.state.numPlayer<0?r.a.createElement("p",{className:"text-danger"}," Number of roles is not correct "):null,t=this.state.numPlayer>0?this.state.numPlayer+" remain":null,a=e||r.a.createElement("button",{className:"btn btn-danger",onClick:this.createPlayers.bind(this)},"Done");return r.a.createElement("div",null,r.a.createElement("h3",null,"Select roles: ",t),r.a.createElement("ul",{className:"list-group",id:"roleSelection"},this.createSelection()),r.a.createElement("br",null),a)}}]),t}(n.Component),y=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={currentPlayer:a.props.players[0],currentIndex:0,actions:{}},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"addAction",value:function(e){var t=this;e.preventDefault();var a=this.state.actions;this.props.players.forEach(function(e,n){var r=t.refs[e.pname],s=r.childNodes[0];s.checked&&(a[t.state.currentIndex]=n,s.checked=!1,r.style.background="",r.style.color="")}),this.setState({actions:a});var n=this.state.currentIndex;(n+=1)===this.props.players.length?this.props.submitActions(this.state.actions):this.setState({currentIndex:n})}},{key:"changeColor",value:function(){var e=this;this.props.players.forEach(function(t,a){var n=e.refs[t.pname];n.childNodes[0].checked?(n.style.background="red",n.style.color="white"):(n.style.background="lightcoral",n.style.color="")})}},{key:"render",value:function(){var e=this,t=this.props.players[this.state.currentIndex].pname,a=this.props.players.map(function(t,a){return r.a.createElement("div",{ref:t.pname,key:t.pname,className:"radio-div",onClick:e.changeColor.bind(e)},r.a.createElement("input",{type:"radio",id:t.pname,name:"target",className:"radio-input",required:!0}),r.a.createElement("label",{className:"radio-label",htmlFor:t.pname},t.pname))});return r.a.createElement("div",{key:t},r.a.createElement(m.CSSTransitionGroup,{transitionName:"fadeOut",transitionAppear:!0,transitionEnter:!0,transitionLeave:!0},r.a.createElement("h2",null,"Night ",this.props.night),r.a.createElement("h3",null,"Turn of ",r.a.createElement("span",{className:"text-white"}," ",t)),r.a.createElement("form",{onSubmit:function(t){return e.addAction.bind(e)(t)}},a,r.a.createElement("button",{type:"submit",className:"mt-3 btn btn-danger"},"Next"))))}}]),t}(n.Component),v=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"executePlayer",value:function(e){var t=this;e.preventDefault(),this.props.players.forEach(function(e,a){t.refs[e.pname].childNodes[0].checked&&t.props.executePlayer(e)})}},{key:"changeColor",value:function(){var e=this;this.props.players.forEach(function(t,a){var n=e.refs[t.pname];n.childNodes[0].checked?(n.style.background="red",n.style.color="white"):(n.style.background="",n.style.color="")})}},{key:"render",value:function(){var e=this,t=[];this.props.players.forEach(function(a,n){var s=r.a.createElement("div",{ref:a.pname,key:a.pname,className:"radio-div",onClick:e.changeColor.bind(e)},r.a.createElement("input",{type:"radio",id:a.pname,name:"target",className:"radio-input",required:!0}),r.a.createElement("label",{className:"radio-label",htmlFor:a.pname},a.pname));t.push(s)});var a=this.props.originPlayers.map(function(e){return r.a.createElement("li",null,e.pname,": ",e.role," ",e.active_wolf)});return r.a.createElement("div",null,r.a.createElement("h3",null,"Events: "),r.a.createElement("ul",null,this.props.events?this.props.events:"Nothing happened"),null!==this.props.gameOver?r.a.createElement("div",null,r.a.createElement("h3",null,this.props.gameOver),r.a.createElement("ul",null,a),r.a.createElement("h3",null,"History"),r.a.createElement("ul",null,this.props.logs),r.a.createElement("button",{onClick:function(){return e.props.restart()},className:"btn btn-danger"},"New game")):r.a.createElement("div",null,r.a.createElement("h3",null," Who's the wolf ? "),r.a.createElement("form",{onSubmit:function(t){return e.executePlayer.bind(e)(t)}},t,r.a.createElement("button",{type:"submit",className:"mt-3 mr-3 btn btn-danger"},"Execute"),r.a.createElement("button",{onClick:function(){return e.props.nextPhase()},className:"mt-3 btn btn-secondary"},"Skip"))))}}]),t}(n.Component),b=["Maria","Guard","Spell Caster","Seer","Hunter","Werewolf","Cursed","Villager"];var g=new f("Albert","Werewolf");g.active_wolf=1;var E=new f("Goldy","Werewolf");E.active_wolf=2;new f("Alice","Seer"),new f("Golden","Hunter"),new f("Goldeny","Villager");var N=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={phase:"setUpName",players:[],playerNames:[],night:1,logs:[]},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"nextPhase",value:function(){this.setState(function(e,t){return{phase:"night",night:e.night+1}})}},{key:"submitPlayerNames",value:function(e){0!==e.length&&this.setState({playerNames:e,phase:"setUpRole"})}},{key:"submitPlayer",value:function(e){var t=this.gameOver(e);t?this.setState({players:e,originPlayers:e.slice(0),phase:"day",gameOver:t}):this.setState({players:e,originPlayers:e.slice(0),phase:"night"})}},{key:"getActiveWolf",value:function(){return this.state.players.filter(function(e){return null!==e.active_wolf}).reduce(function(e,t){return e.active_wolf<t.active_wolf?e:t})}},{key:"submitActions",value:function(e){var t=this.state.players,a=this.getActiveWolf(),n=this.state.logs;n.push(r.a.createElement("p",null,r.a.createElement("b",null,"Night ",this.state.night))),b.forEach(function(s){t.forEach(function(l,i){if(l.role===s){var o=t[e[i]];"Werewolf"!==l.role?l.do_action(o):l===a&&l.do_action(o),n.push(r.a.createElement("li",null,l.role,l.active_wolf," choose ",o.role,o.active_wolf))}})});var s=[],l=[];t.forEach(function(e){e.bitten&&(l.push(r.a.createElement("li",{key:e.id},e.pname," died.")),s.push(e),"Hunter"===e.role&&e.previous_target!==e&&(l.push(r.a.createElement("li",{key:e.previous_target.id},e.previous_target.pname," died.")),s.push(e.previous_target))),e.muted&&l.push(r.a.createElement("li",{key:e.id},e.pname," is muted.")),e.seer&&(e.bitten?l.push(r.a.createElement("li",{key:e.id},e.pname," needs to tell truth")):l.push(r.a.createElement("li",{key:e.id},e.pname," needs to tell truth (truth: ",e.previous_target.pname,")"))),e.init_stats()}),t=t.filter(function(e){return!s.includes(e)}),this.setState({phase:"day",events:l,players:t,gameOver:this.gameOver(t),logs:n})}},{key:"gameOver",value:function(e){var t=0;return e.forEach(function(e){t="Werewolf"===e.role?t-1:t+1}),t===e.length?"Villagers won.":t<=0?"Wolfs won.":null}},{key:"restart",value:function(){this.setState({phase:"setUpName",players:[],playerNames:[],events:[],night:1,logs:[]})}},{key:"executePlayer",value:function(e){var t=this.state.players.filter(function(t){return t!==e}),a=this.gameOver(t);a?this.setState({players:t,phase:"day",gameOver:a}):this.setState(function(e,a){return{players:t,phase:"night",night:e.night+1}})}},{key:"render",value:function(){var e=this.state.phase;return"setUpName"===e?r.a.createElement(p,{submitPlayerNames:this.submitPlayerNames.bind(this)}):"setUpRole"===e?r.a.createElement(d,{playerNames:this.state.playerNames,submitPlayer:this.submitPlayer.bind(this)}):"night"===e?r.a.createElement(y,{players:this.state.players,night:this.state.night,submitActions:this.submitActions.bind(this)}):"day"===e?r.a.createElement(v,{events:this.state.events,nextPhase:this.nextPhase.bind(this),players:this.state.players,originPlayers:this.state.originPlayers,executePlayer:this.executePlayer.bind(this),logs:this.state.logs,gameOver:this.state.gameOver,restart:this.restart.bind(this)}):r.a.createElement("div",null," ",e," ")}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[15,1,2]]]);
//# sourceMappingURL=main.06b9f42f.chunk.js.map