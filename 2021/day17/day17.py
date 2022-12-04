target_x = range(20, 30 + 1)
target_y = range(-10, -5 + 1)

# given x, y velocity values, return highest y pos if we step through target
# else return False
def calc(x_velocity, y_velocity, target_x, target_y):
    cur_x, cur_y = 0, 0
    best_y = 0
    while cur_x < target_x[-1] and cur_y > target_y[-1]:
        cur_x += x_velocity
        cur_y += y_velocity
        x_velocity += 1 if x_velocity < 0 else (-1 if x_velocity > 0 else 0)
        y_velocity -= 1

        best_y = max(best_y, cur_y)
        if cur_x in target_x and cur_y in target_y:
            return best_y
    return 0


def sweep(target_x=target_x, target_y=target_y):
    # calculate possible x_velocity values
    # best values are ones which maximise number of steps
    # the min x_velocity such that cur_pos is in target_x by the time x_velocity reaches 0, 
    # and the max
    
    # for the x_velocity values in that range:
    
