/****************************************************************************
** Meta object code from reading C++ file 'sharehelper.h'
**
** Created: Wed 12. Sep 14:58:18 2012
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.4)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../sharehelper.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'sharehelper.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.4. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_ShareHelper[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       2,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // slots: signature, parameters, type, tag, flags
      35,   13,   12,   12, 0x0a,
      69,   13,   12,   12, 0x0a,

       0        // eod
};

static const char qt_meta_stringdata_ShareHelper[] = {
    "ShareHelper\0\0title,description,url\0"
    "shareURL(QString,QString,QString)\0"
    "shareImage(QString,QString,QString)\0"
};

const QMetaObject ShareHelper::staticMetaObject = {
    { &QObject::staticMetaObject, qt_meta_stringdata_ShareHelper,
      qt_meta_data_ShareHelper, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &ShareHelper::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *ShareHelper::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *ShareHelper::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_ShareHelper))
        return static_cast<void*>(const_cast< ShareHelper*>(this));
    return QObject::qt_metacast(_clname);
}

int ShareHelper::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QObject::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: shareURL((*reinterpret_cast< QString(*)>(_a[1])),(*reinterpret_cast< QString(*)>(_a[2])),(*reinterpret_cast< QString(*)>(_a[3]))); break;
        case 1: shareImage((*reinterpret_cast< QString(*)>(_a[1])),(*reinterpret_cast< QString(*)>(_a[2])),(*reinterpret_cast< QString(*)>(_a[3]))); break;
        default: ;
        }
        _id -= 2;
    }
    return _id;
}
QT_END_MOC_NAMESPACE
