import os
import shutil


def save_upload_cover(cover) -> str:
    upload_dir = os.path.join(os.getcwd(), 'uploads')
    # Create the upload directory if it doesn't exist
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
    # get the destination path
    dest = os.path.join(upload_dir, cover.filename)

    # copy the file contents
    with open(dest, 'wb') as buffer:
        shutil.copyfileobj(cover.file, buffer)

    return dest
