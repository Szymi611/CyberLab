# CyberLab - Docker Setup

## Wymagania
- Docker Desktop (dla Windows)
- Docker Compose (zwykle instaluje się razem z Docker Desktop)

## Szybki Start

### 1. Uruchomienie całej aplikacji
```powershell

docker-compose up --build
```

Aplikacja będzie dostępna pod:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

### 2. Uruchomienie w tle (detached mode)
```powershell
docker-compose up -d --build
```

### 3. Zatrzymanie aplikacji
```powershell
docker-compose down
```

### 4. Zatrzymanie i usunięcie volumes (czyści bazę danych)
```powershell
docker-compose down -v
```

## Komendy Przydatne

### Sprawdzenie logów
```powershell

docker-compose logs -f

# Tylko backend
docker-compose logs -f backend

# Tylko frontend
docker-compose logs -f frontend
```

### Rebuild konkretnego serwisu
```powershell
docker-compose up -d --build backend
docker-compose up -d --build frontend
```

### Wejście do kontenera (shell)
```powershell
# Backend
docker exec -it cyberlab-backend sh

# Frontend
docker exec -it cyberlab-frontend sh
```

### Restart serwisu
```powershell
docker-compose restart backend
docker-compose restart frontend
```

### Lista działających kontenerów
```powershell
docker-compose ps
```

## Tryb Development vs Production

### Development (obecna konfiguracja)
- Backend z hot-reload (zmiany w kodzie są widoczne od razu)
- Volume mounting dla łatwego developmentu

### Production (zoptymalizowana wersja)
Możesz stworzyć osobny `docker-compose.prod.yml`:
```powershell
docker-compose -f docker-compose.prod.yml up -d
```

## Troubleshooting

### Problem z portami
Jeśli porty 3000 lub 8000 są zajęte:
```yaml

ports:
  - "3001:80"  # frontend
  - "8001:8000"  # backend
```

### Czyszczenie Docker cache
```powershell
# Usuń wszystko
docker system prune -a

# Usuń tylko niewykorzystane obrazy
docker image prune
```

### Reset bazy danych
```powershell
# Usuń plik bazy danych i restart
docker-compose down
Remove-Item .\backend\database.db
docker-compose up -d
```

## Struktura

```
BScThesis/
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── ... (kod backendu)
├── frontend/cyberlab/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── nginx.conf
│   └── ... (kod frontendu)
├── docker-compose.yml
└── .dockerignore
```

## Zmienne Środowiskowe

Możesz dodać plik `.env` w głównym katalogu:
```
BACKEND_PORT=8000
FRONTEND_PORT=3000
NODE_ENV=production
```

I użyć w `docker-compose.yml`:
```yaml
ports:
  - "${BACKEND_PORT}:8000"
```
