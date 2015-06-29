function Event() {
    this.EventDelegate = new Array()
}

Event.prototype.add = function(a, b) {
    this.EventDelegate.push([a, b])
}

Event.prototype.remove = function(a) {
    for (var b = 0; b < this.EventDelegate.length; ++b) {
        if (this.EventDelegate[b][0] == a) {
            this.EventDelegate.splice(b, 1);
            break
        }
    }
}

Event.prototype.clear = function() {
    this.EventDelegate = new Array()
}

Event.prototype.dispatch = function() {
    var a = arguments;
    for (var b = 0; b < this.EventDelegate.length; ++b) {
        this.EventDelegate[b][0].apply(this.EventDelegate[b][1], a)
    }
}

function Timer() {
    this.enable = false;
    this.interval = 1;
    this.time = 0;
    this.OnTimer = new Event()
}

Timer.Pause = false;
Timer.sigTimer = new Event();
Timer.prototype.onSigTimer = function() {
    if (this.enable && (Timer.getTime() >= this.time)) {
        this.OnTimer.Dispatch();
        this.time = Timer.getTime() + this.interval
    }
}

Timer.SigTimer = function() {
    if (!Timer.Pause) {
        Timer.sigTimer.Dispatch()
    }
}

Timer.prototype.start = function() {
    if (!this.enable) {
        this.enable = true;
        this.time = Timer.getTime() + this.interval;
        Timer.sigTimer.Add(this.OnSigTimer, this)
    }
}

Timer.prototype.stop = function() {
    if (this.enable) {
        this.enable = false;
        Timer.sigTimer.Remove(this.OnSigTimer)
    }
}

Timer.prototype.isEnabled = function() {
    return this.enable
}

Timer.prototype.setInterval = function(a) {
    this.interval = a;
    this.time = Timer.getTime() + this.interval
}

Timer.prototype.getInterval = function() {
    return this.interval
}

Timer.getTime = function() {
    return (new Date).getTime() * 0.001
}