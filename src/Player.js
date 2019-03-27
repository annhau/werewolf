export class Player {
    constructor(pname, role) {
        this.pname = pname;
        this.role = role;
        this.active_wolf = null;
        this.init_stats();
    }

    init_stats() {
        this.bitten = false;
        this.protected = false;
        this.seer = false;
        this.muted = false;
        this.hunted = false;
        this.disabled = false;
        this.previous_target = null;
    }

    do_action(oplayer) {
        this.previous_target = oplayer;
        if (this.disabled) return;
        let r = this.role;
        if (r === 'Maria')
            oplayer.disabled = true;
        else if (r === 'Guard')
            oplayer.protected = true;
        else if (r === 'Spell Caster')
            oplayer.muted = true;
        else if (r === 'Seer')
            oplayer.seer = true;
        else if (r === 'Hunter')
            oplayer.hunted = true;
        else if (this.active_wolf !== null) {
            if (!oplayer.protected) {
                if (oplayer.role === 'Cursed') {
                    oplayer.role = 'Werewolf';
                    oplayer.active_wolf = 69
                } else
                    oplayer.bitten = true;
            }
        }
    }
}
