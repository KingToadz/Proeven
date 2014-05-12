/**
 * Created by Jelle on 5/9/2014.
 */

CollisionUtil = function(){};

CollisionUtil.checkCollision = function(tx1, ty1, tx2, ty2, cx1, cy1, cx2, cy2)
{
    // left
    if (tx2 > cx1 && tx1 < cx1)
    {
        if ((ty1 < cy2 && ty2 > cy1) || (ty2 > cy1 && ty1 < cy2))
        {
            return true;
        }
    }

    // up
    if (ty1 < cy2 && ty2 > cy2)
    {
        if ((tx1 < cx2 && tx2 > cx1) || (tx2 > cx1 && tx1 < cx2))
        {
            return true;
        }
    }

    // right
    if (tx1 < cx2 && tx2 > cx2)
    {
        if ((ty1 < cy2 && ty2 > cy1) || (ty2 > cy1 && ty1 < cy2))
        {
            return true;
        }
    }

    // down
    if (ty2 > cy1 && ty1 < cy1)
    {
        if ((tx1 < cx2 && tx2 > cx1) || (tx2 > cx1 && tx1 < cx2))
        {
            return true;
        }
    }

    return false;
};
