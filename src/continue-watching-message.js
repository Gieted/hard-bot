import { disLike, like } from './emojis'

const continueWatchingMessage = (messageUrl) => `Możesz wznowić oglądanie filmików od miejsca, w którym ostatnio skończyłeś.
Wystarczy, że będziesz oceniał obejrzane filmy przy pomocy ${like}${disLike}.

Naciśnij ten link, by przeskoczyć do pierwszego nieobejrzanego filmiku: ${messageUrl}`

export default continueWatchingMessage
