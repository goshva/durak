in windows working in wsl ( in PowerShell in ADMIN: wsl --install)
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

for RUN APP:
Open mminimum 2 Browser windows with index.html and run in both connect and send buttons
(file://wsl.localhost/Ubuntu/home/goshva/python/durak/index.html)
