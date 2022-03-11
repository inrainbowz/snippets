import json

def write_json(data, filename='counter.json') -> None:
    with open(filename, "w") as f:
        json.dump(data, f, indent=4)
    return


def get_bom(id, filename='counter.json'):
    with open(filename, "r") as f:
        data = json.load(f)
        users = data["users"]
        for user in range(len(users)):
            if users[user]['ID'] == str(id):
                return users[user]['Times']
        return 0


def main(author_id) -> None:
    with open('counter.json') as json_file:
        data = json.load(json_file)
        users = data["users"]
        id = author_id
        state = False
        for user in range(len(users)):
            if users[user]['ID'] == str(id):
                times = users[user]['Times']
                times += 1
                users[user]['Times'] = times
                write_json(data)
                state = False
                break
            state = True

        if state:
            new_user = {"ID": f"{id}", "Times": 1}
            users.append(new_user)
            write_json(data)
    json_file.close()        
    return