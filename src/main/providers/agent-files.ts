import * as fs from 'fs';
import * as path from 'path';

/** Slug must contain only alphanumeric characters, hyphens, and underscores. */
const VALID_SLUG = /^[a-zA-Z0-9_-]+$/;

function assertValidSlug(slug: string): void {
  if (!VALID_SLUG.test(slug)) {
    throw new Error(`Invalid agent slug: "${slug}". Only letters, numbers, hyphens, and underscores are allowed.`);
  }
}

/** Write `<dir>/<slug><ext>` with the given content. Creates the directory recursively. */
export async function writeAgentFile(
  dir: string,
  slug: string,
  content: string,
  ext: string = '.md',
): Promise<{ filePath: string }> {
  assertValidSlug(slug);
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `${slug}${ext}`);
  await fs.promises.writeFile(filePath, content, 'utf8');
  return { filePath };
}

/** Delete `<dir>/<slug><ext>`. Swallows ENOENT so callers can call freely. */
export async function deleteAgentFile(dir: string, slug: string, ext: string = '.md'): Promise<void> {
  assertValidSlug(slug);
  const filePath = path.join(dir, `${slug}${ext}`);
  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
  }
}
