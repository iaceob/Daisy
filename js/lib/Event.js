function Event() {
    this.EventDelegate = new Array()
}

Event.prototype.Add = function(a, b) {
    this.EventDelegate.push([a, b])
}

Event.prototype.Remove = function(a) {
    for (var b = 0; b < this.EventDelegate.length; ++b) {
        if (this.EventDelegate[b][0] == a) {
            this.EventDelegate.splice(b, 1);
            break
        }
    }
}

Event.prototype.Clear = function() {
    this.EventDelegate = new Array()
}

Event.prototype.Dispatch = function() {
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
Timer.prototype.OnSigTimer = function() {
    if (this.enable && (Timer.GetTime() >= this.time)) {
        this.OnTimer.Dispatch();
        this.time = Timer.GetTime() + this.interval
    }
}

Timer.SigTimer = function() {
    if (!Timer.Pause) {
        Timer.sigTimer.Dispatch()
    }
}

Timer.prototype.Start = function() {
    if (!this.enable) {
        this.enable = true;
        this.time = Timer.GetTime() + this.interval;
        Timer.sigTimer.Add(this.OnSigTimer, this)
    }
}

Timer.prototype.Stop = function() {
    if (this.enable) {
        this.enable = false;
        Timer.sigTimer.Remove(this.OnSigTimer)
    }
}

Timer.prototype.IsEnabled = function() {
    return this.enable
}

Timer.prototype.SetInterval = function(a) {
    this.interval = a;
    this.time = Timer.GetTime() + this.interval
}

Timer.prototype.GetInterval = function() {
    return this.interval
}

Timer.GetTime = function() {
    return (new Date).getTime() * 0.001
}