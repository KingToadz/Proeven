/**
 * Created by Jelle on 4/25/2014.
 */

Arguments = function(){};

Arguments.args = [];

Arguments.add = function(key, value)
{
    Arguments.args[key] = value;
};

Arguments.initialize = function()
{
    var location = window.location.href.toString();

    if(location.indexOf("?") != -1)
    {
        var arguments = location.substr(location.indexOf("?") + 1).split("&");

        for(var i = 0; i < arguments.length; i++)
        {
            var data = arguments[i].split("=");

            if(data.length == 2)
            {
                var key = data[0];
                var value = data[1];
                if(key != undefined && value != undefined)
                {
                    Arguments.add(key, value);
                }
            }
        }
    }
};

Arguments.get = function(key)
{
    return Arguments.args[key];
};
