import durak_class as du
import json
# Example usage
game = du.DurakGame(5)
s1 = game.play_game()
jsonstr1 = json.dumps(s1.__dict__)
print(jsonstr1)