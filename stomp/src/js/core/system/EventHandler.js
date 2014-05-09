/**
 * Created by Jelle on 4/26/2014.
 */

EventHandler = function(object, executeFunction)
{
    this.object = object;
    this.executeFunction = executeFunction;

    var instance = this;
    this.execute = function(args)
    {
        instance.executeFunction.call(instance.object, args);
    };
	
	return this.execute;
};
