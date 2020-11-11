import yaml
from pathlib import Path

for f in Path(".").glob("*.yaml"):
    content = yaml.safe_load(f.read_text())
    #for t in ["phone_ports", "audio_ports", "video_ports"]:
    #    if not t in content:
    #        continue
    #    ports = content[t]
    #    content[t] = list(map(lambda x: { "type": x }, ports))
    #    print(content)
    content.pop("detachable_antennas", False)
    f.write_text(yaml.safe_dump(content))
