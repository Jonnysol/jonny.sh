import os
import subprocess
import glob

# Use absolute path to be safe, assuming script is run from project root
BELT_DIR = os.path.abspath("public/assets/img/belt")
TARGET_EXTS = [".mov", ".webp", ".MOV", ".WEBP"]
MAX_DURATION = 4.0 # If longer than this, we trim
TRIM_DURATION = 3.0 # Duration to keep if trimming

def get_duration(filepath):
    try:
        cmd = [
            "ffprobe", 
            "-v", "error", 
            "-show_entries", "format=duration", 
            "-of", "default=noprint_wrappers=1:nokey=1", 
            filepath
        ]
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        output = result.stdout.strip()
        if not output:
             # Might be an image without duration metadata if it's just a static webp
             return 0.0
        return float(output)
    except Exception as e:
        print(f"Error getting duration for {filepath}: {e}")
        return 0.0

def convert_to_gif(filepath):
    filename = os.path.basename(filepath)
    name, ext = os.path.splitext(filename)
    output_path = os.path.join(BELT_DIR, name + ".gif")
    
    # Check if target already exists; if so, maybe skip or overwrite? 
    # User said "clean up", implying the current state has these files. 
    # If .gif exists, we might be re-running. I'll overwrite.
    
    duration = get_duration(filepath)
    print(f"Processing {filename} (Duration: {duration}s)")
    
    cmd = ["ffmpeg", "-y", "-i", filepath]
    
    # 0.0 duration usually means static image
    if duration > 0 and duration > MAX_DURATION:
        # Calculate start time to center the clip
        start_time = (duration - TRIM_DURATION) / 2
        print(f"  -> Too long, trimming to {TRIM_DURATION}s starting at {start_time:.2f}s")
        cmd.extend(["-ss", str(start_time), "-t", str(TRIM_DURATION)])
    
    # Filter for quality and size
    # scale=320:-1 keeps aspect ratio, width 320. Good for "belt" thumbnails.
    # split and palettegen for better colors
    filter_complex = "fps=15,scale=320:-1:flags=lanczos[s];[s]split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse"
    
    cmd.extend(["-vf", filter_complex, output_path])
    
    # Capture output to avoid spamming user console unless error
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    
    if result.returncode == 0:
        print(f"  -> Created {os.path.basename(output_path)}")
        try:
            os.remove(filepath)
            print(f"  -> Deleted original {filename}")
        except Exception as e:
            print(f"  -> Failed to delete original: {e}")
    else:
        print(f"  -> Error converting {filename}:")
        print(result.stderr)

def main():
    if not os.path.exists(BELT_DIR):
        print(f"Directory not found: {BELT_DIR}")
        return

    print(f"Scanning {BELT_DIR}...")
    files = []
    for ext in TARGET_EXTS:
        files.extend(glob.glob(os.path.join(BELT_DIR, "*" + ext)))
    
    # Also handle possible case sensitivity by just grabbing all files and checking ext
    # (glob handles *ext but specific lists might miss .Mov vs .mov if not careful)
    # The list above covers basics.
    
    # Deduplicate (just in case)
    files = list(set(files))
    
    if not files:
        print("No matches found.")
        return

    print(f"Found {len(files)} files to process.")
    for f in files:
        convert_to_gif(f)

if __name__ == "__main__":
    main()
