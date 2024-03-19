import random

class DurakGame:
    def __init__(self, players_count):
        self.players_count = players_count
        self.deck = []
        self.active_suit =''
        self.attacker = ''
        self.defender = ''
        self.players = list(range(players_count))
        self.pl_roles=list()
       # self.suits = ['♥', '♦', '♣', '♠️']
        self.suits = ['Ch', 'B', 'K', 'P']
        self.ranks = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
        self.passes = 0
        self.target = 0
        self.deck_id=[]
        self.id=''
        self.name=''
        self.usernames=[]
    def create_deck(self):
        self.deck = [(suit, rank) for suit in self.suits for rank in self.ranks]
        
    def shuffle_deck(self):
        random.shuffle(self.deck)
        

    def deal_cards(self):
        cards_per_player = 6 #len(self.deck) // self.players_count
        for player in self.players:
            dealt_cards = [self.deck.pop() for _ in range(cards_per_player)]
            self.players[player] = dealt_cards
        self.s()#кидаем козыря    

    def start_game(self):
        self.create_deck()#собираем колоду
        self.shuffle_deck()#тасуем карты
        self.deal_cards()#раздаем карты
        #self.active_suit = random.choice(['♥', '♦', '♣', '♠️'])
        #self.active_suit = random.choice(['Ch', 'B', 'K', 'P'])
        #self.active_suit =self.deck[len(self.deck)-1]
        self.attacker = self.find_lowest_trump()#определяем кто первый ходит
        #random.choice(list(self.players.keys()))
        self.defender = self.get_next_player(self.attacker)#под кого ходят
        for i in range(self.players_count):
            self.pl_roles.append(self.role_play(i))
        print(self.pl_roles)
    def s(self):
        self.active_suit =self.deck[len(self.deck)-1][0]
        a=self.deck.pop()
        self.deck.insert(0,a)
        print(self.deck[len(self.deck)-1])


    def find_lowest_trump(self):
        lowest_trump = float('inf')
        lowest_trump_sublist = None
        
        for sublist in self.players:
            for card in sublist:
                suit, rank = card
                if suit == self.active_suit:
                    status = self.ranks.index(rank)
                    if status < lowest_trump:
                        lowest_trump = status
                        lowest_trump_sublist = sublist
        return lowest_trump_sublist

    def get_next_player(self, current_player):
        players = list(self.players)
        current_index = players.index(current_player)
        return players[(current_index + 1) % len(players)]

    def play_round(self):
        while self.passes < self.players_count:
            attacker_cards = self.players[self.attacker]
            defender_cards = self.players[self.defender]

            # Attacker plays a card
            if attacker_cards:
                played_card = random.choice(attacker_cards)
                print(f'{self.attacker} plays {played_card[1]} of {played_card[0]}')
                attacker_cards.remove(played_card)
                if played_card[0] != self.active_suit:
                    self.active_suit = played_card[0]

            # Defender tries to beat the card
            if defender_cards:
                valid_defense_cards = [card for card in defender_cards if card[0] == self.active_suit]
                if valid_defense_cards:
                    defense_card = random.choice(valid_defense_cards)
                    print(f'{self.defender} defends with {defense_card[1]} of {defense_card[0]}')
                    defender_cards.remove(defense_card)
                else:
                    # Defender failed to beat the card, so they should pick it up
                    print(f'{self.defender} failed to defend and picks up the cards')
                    defender_cards.append(played_card)

            if len(attacker_cards) == 0:
                print(f'{self.attacker} is out of cards')
                self.attacker = self.get_next_player(self.attacker)
                break

            if len(defender_cards) == 0:
                print(f'{self.defender} is out of cards')
                self.defender = self.get_next_player(self.defender)
                break

            self.attacker = self.get_next_player(self.attacker)
            self.defender = self.get_next_player(self.defender)

    def play_game(self):
        self.start_game()
        #while self.players_count > 0:
            #self.play_round()
        return(self)
    def role_play(self,n):
    
        na=self.attacker
        np=self.players
        nd=self.defender
        a=((na[0][0]==np[n][0][0])and(na[0][1]==np[n][0][1]))
        b=((nd[0][0]==np[n][0][0])and(nd[0][1]==np[n][0][1]))
        if a!=False:
            return "attacker"
        if b!=False:
            return "defender"
        else:
            return "attacker2" 

# Example usage
#game = DurakGame(2)
#game.play_game()
