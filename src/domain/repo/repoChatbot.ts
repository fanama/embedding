export interface repoChatbot {
  updateModel (modelPath: string): void;
  ask (question: string, handler?: (token: string) => void): Promise<string>;
}