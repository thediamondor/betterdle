/**
 * Model User
 * 
 */
 export type User = {
    id: number
    email: string
    firstName: string
    lastName: string
  }
  
  /**
   * Model WordleWord
   * 
   */
  export type WordleWord = {
    word: string
  }
  
  /**
   * Model Game
   * 
   */
  export type Game = {
    id: number
    userId: number
    correctWord: string
    createdAt: Date
    guesses: Guess[]
  }
  
  /**
   * Model Guess
   * 
   */
  export type Guess = {
    id: number
    word: string
    gameId: number
    guessedAt: string
  }

  /**
 * Model DailyWord
 * 
 */
export type DailyWord = {
  id: number
  date: Date
  word: string
}

/**
 * Model UserDailyWord
 * 
 */
export type UserDailyWord = {
  dailyWordId: number
  userId: number
}
  
  