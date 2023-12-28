in windows working in wsl ( Power Shell in ADMIN: wsl --install)
```
python3 -m venv env 
source env/bin/activate
pip  install -r requirements.txt 
chmod +x ws.py 
./ws.py 
```
if adding modules plz run:
```
  pip3 freeze > requirements.txt
```
if OSError: [Errno 98] error while attempting to bind on address ('0.0.0.0', 8765): address already in use
```
sudo kill -9 `sudo lsof -t -i:8765`
```
