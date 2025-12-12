import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

interface SecretConfig {
  projectId: string;
  secretName: string;
  version?: string;
}

class GoogleSecretManagerService {
  private client: SecretManagerServiceClient;
  private projectId: string;
  private cache: Map<string, string> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor(projectId: string) {
    this.projectId = projectId;
    this.client = new SecretManagerServiceClient();
  }

  /**
   * Get a secret value from Google Cloud Secret Manager
   * @param secretName - The name of the secret
   * @param version - The version of the secret (default: 'latest')
   * @returns Promise<string> - The secret value
   */
  async getSecret(
    secretName: string,
    version: string = 'latest'
  ): Promise<string> {
    const cacheKey = `${secretName}:${version}`;
    const now = Date.now();

    // Check if we have a cached value that's still valid
    if (this.cache.has(cacheKey) && this.cacheExpiry.has(cacheKey)) {
      const expiryTime = this.cacheExpiry.get(cacheKey)!;
      if (now < expiryTime) {
        return this.cache.get(cacheKey)!;
      }
    }

    try {
      const name: string = `projects/${this.projectId}/secrets/${secretName}/versions/${version}`;
      const [secretVersion] = await this.client.accessSecretVersion({ name });

      if (!secretVersion.payload?.data) {
        throw new Error(`Secret ${secretName} not found or empty`);
      }

      const secretValue = secretVersion.payload.data.toString();

      // Cache the result
      this.cache.set(cacheKey, secretValue);
      this.cacheExpiry.set(cacheKey, now + this.CACHE_DURATION);

      return secretValue;
    } catch (error) {
      console.error(`Error fetching secret ${secretName}:`, error);
      throw new Error(`Failed to fetch secret ${secretName}: ${error}`);
    }
  }

  /**
   * Get multiple secrets at once
   * @param secrets - Array of secret configurations
   * @returns Promise<Record<string, string>> - Object with secret names as keys and values
   */
  async getSecrets(secrets: SecretConfig[]): Promise<Record<string, string>> {
    const results: Record<string, string> = {};

    await Promise.all(
      secrets.map(async (secret) => {
        try {
          const value = await this.getSecret(secret.secretName, secret.version);
          results[secret.secretName] = value;
        } catch (error) {
          console.error(`Failed to fetch secret ${secret.secretName}:`, error);
          results[secret.secretName] = '';
        }
      })
    );

    return results;
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.cache.clear();
    this.cacheExpiry.clear();
  }

  /**
   * Close the client connection
   */
  async close(): Promise<void> {
    await this.client.close();
  }
}

export { GoogleSecretManagerService, SecretConfig };
