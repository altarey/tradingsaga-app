Use cases
=-=-=-=-=-=-=-=-=-=-=-==-=-==-===-

## Board's usecases

1) Board retrieves "NEXT" stock ticker for a session
    - Board's index of current ticker (position in playlist) is persistent
2) Board requires fields from a stock ticker to display in the header
    - label (full name)
    - ticker (short name)
    - ... (all other properties we currently have in UI)

3) Board needs to get price history sorted by datetime for a current ticker. For each element of history Board needs props:
    - price
    - date
    - time? (optional if intraday history)

4) Board needs to display benchmark performance of current ticker at the end of session
    For ticker's benchmark it needs:
   - Benchmark's price on start (date/time of first element of price history)
   - Benchmark's price On End (date/time of last element of price history)
   - benchmark name (SPY, and etc.)

### Issues

    - tight coupling with both Board and Stockchart
    - inefficient benchmark calculation (guesstimate benchmark, not precise)

## User's playlist usecases

1) Change order of tickers
2) Add/Remove tickers:
    - Add/remove tickers from preinstalled repository
    - Add/remove tickers from online repository (make it available for offline game)
3) Users default playlist
   - On first run, playlist populates with preinstalled tickers

## Playlist UI usecases

1) Show ordered list of tickers
    - name
    - interval
    - ...
2) Change order of tickers (move up/move down)
3) Remove ticker from playlist
4) Add a ticker from repos
    - Show list of available repos (Preinstalled, Online)
    - For each repo show list of available ticker
    - For each repo ticker show if it's already in playlist
    - Show progress while adding/downloading ticker into playlist
5) Playlist is persistent

---

# Data types and APIs

## API for Board UI

```
async getNextTickerToPlay():TickerDataFile
interface TickerDataFile:
    - label
    - name
    - ticker
    ...
    - benchmark: {
        startPrice:number
        endPrice:number
        ticker:string
    }
    - history:[{
        price:number
        date:string
        time?:string
    }]
```

## API for playlist UI

```
getPlaylist():PlaylistItem[]

interface Playitem{
    name:string
    interval:string
}

updatePlaylistOrder(newPlaylist:PlaylistItem[])

removeTickerFromPlaylist(item:PlaylistItem)

getAvailableRepositories():Repository[]

interface Repository{
    name:string
    tickers:RepositoryItem[]
}

interface RepositoryItem {
    name:string
    interval:string
}

isRepoItemInPlaylist(repoItem:RepositoryItem):boolean

addRepoItemToPlaylistAsync(item:RepositoryItem):Promise
```
