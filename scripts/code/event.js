if (!window.Help) {
    window.Help = {};
}

window.Help.event = new (function () {
    this.raise = function (name, args, type) {
        var request = {
            method: 'POST',
            url: 'https://apis.appacitive.com/eventservice/raise',
            data: {
                m: 'POST',
                b: {
                    name: name,
                    __args: args || {},
                    __type: type
                }
            }
        };
        window.Help.utils.ajax.send(request, function () {}, function (err) { console.log("Error sending raise request") });
    }
})();