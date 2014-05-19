/**
 * Created by Jelle on 5/19/2014.
 */

Database = function(){};

Database.getItem = function(key)
{
    if(window.localStorage)
    {
        var d = window.localStorage.getItem(key);
        if(d != undefined && d != "")
        {
            return d;
        }
    }

    return undefined;
};

Database.setItem = function(key, value)
{
    if(window.localStorage)
    {
        window.localStorage.setItem(key, "" + value);
    }
};
