
#version 450
#extension GL_ARB_separate_shader_objects : enable
#extension GL_ARB_shading_language_420pack : enable


layout (binding = 1) uniform sampler2D base;
layout (binding = 2) uniform sampler2D over;

layout (location = 0) in vec4 inColor;
layout (location = 1) in vec2 inUV;

layout (location = 0) out vec4 outFragColor;


void main() {
    const vec3 zero = vec3(0,0,0);
    const vec3 one = vec3(1,1,1);
    const vec3 two = one * 2.0;
    const float e = 1e-10;

    vec4 cb = texture(base, inUV);
    vec4 c0 = texture(over, inUV);
    vec4 co = c0 * inColor;
    vec3 blend = cb.rgb+co.rgb-2.0*cb.rgb*co.rgb;
    outFragColor =  vec4(mix(cb.rgb,blend,co.a),c0.a);
}