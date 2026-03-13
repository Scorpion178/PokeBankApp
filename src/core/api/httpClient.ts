import axios from 'axios';

export const pokeApiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
});

export interface ApiErrorShape {
  message: string;
}

export const mapApiError = (error: unknown): ApiErrorShape => {
  if (axios.isAxiosError(error)) {
    return {
      message:
        error.response?.data?.message ??
        error.message ??
        'Ocurrió un error al comunicarse con el servidor.',
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: 'Ocurrió un error inesperado.' };
};

